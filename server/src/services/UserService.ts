import * as argon from 'argon2'
import {User} from '../entities/User';
import {Arg, Mutation, Query, Resolver} from 'type-graphql';
import {getModelForClass} from '@typegoose/typegoose';
import {Auth} from './AuthService';
import {userInfo} from 'os';


export class UserServiceClass {

    @Mutation(() => User)
    public async signUp(newUser: User): Promise<User> {
        const model = getModelForClass(User);
        newUser.password = await argon.hash(newUser.password);
        console.log(newUser)
        return await model.create(newUser);
    }

    @Query(() => User)
    public async findByEmail(email: string): Promise<User> {
        const model = getModelForClass(User);
        return await model.findOne({email});
    }

    @Mutation(() => User, {nullable: true})
    public async updateOne(@Arg('data') data: User) {
        const model = getModelForClass(User);
        const user = await model.findByIdAndUpdate(
            {_id: data._id},
            {$set: data},
            {new: true})
        console.log(user)
        console.log("USER")
        console.log(data)
        return user
    }

    @Mutation(() => User, {nullable: true})
    public async lostPassword(@Arg('email') email: string): Promise<User> {
        const model = getModelForClass(User);
        const user = await Auth.passwordLost(email);
        const userUpdating = await model.findOneAndUpdate(
            {email: email},
            {user: user.user, token: user.token},
            {new: true});
        if (userUpdating) {
            return (userUpdating);
        }
        return null as any;
    }


    @Query(() => [User])
    public async fetchAll(): Promise<User[]> {
        const model = getModelForClass(User)
        return model.find();
    }

    @Query(() => [User])
    async search(name: string) {
        const model = getModelForClass(User)
        if (name.length > 1) {
            return (await model.find()).filter(user => {
                return user.lastName.includes(name) || user.firstName.includes(name)
            })
        } else {
            return model.find();
        }

    }
}

export const UserService = new UserServiceClass();