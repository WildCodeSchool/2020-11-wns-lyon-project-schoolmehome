import * as argon from 'argon2'
import {User} from '../entities/User';
import {Arg, Mutation, Query, Resolver} from 'type-graphql';
import {getModelForClass} from '@typegoose/typegoose';
import {Auth} from './AuthService';
import {userInfo} from 'os';
import { Teacher } from '../entities/Teacher';


export class UserServiceClass {

    @Mutation(() => User)
    public async signUp(newUser: User): Promise<User> {
        const model = getModelForClass(User);
        newUser.password = await argon.hash(newUser.password);
        return await model.create(newUser);
    }

    @Mutation(() => Teacher)
    public async signUpTeacher(newUser: Teacher): Promise<Teacher> {
        const model = getModelForClass(Teacher);
        newUser.password = await argon.hash(newUser.password);
        console.log(newUser)
        return await model.create(newUser);
    }

    @Query(() => User)
    public async findByEmail(email: string): Promise<User> {
        const model = getModelForClass(User);
        return await model.findOne({ email });
    }

    @Mutation(() => User, {nullable: true})
    public async updateOne(@Arg('data') data: User) {
        const model = getModelForClass(User);
        return await model.findByIdAndUpdate(
            {_id: data._id},
            {$set: data},
            {new: true})

    }

    // @Mutation(() => User, {nullable: true})
    // public async lostPassword(@Arg('email') email: string): Promise<User> {
    //     const model = getModelForClass(User);
    //     const user = await Auth.passwordLost(email);
    //     console.log(user);
    //     const userUpdating = await model.findOneAndUpdate(
    //         {email: email},
    //         // {user: user.user, token: user.token},
    //         {new: true});
    //     if (userUpdating) {
    //         return (userUpdating);
    //     }
    //     return null as any;
    // }


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
                return user.lastName.toUpperCase().includes(name.toUpperCase()) || user.firstName.toUpperCase().includes(name.toUpperCase())
            })
        } else {
            return model.find();
        }

    }

    @Mutation(() => [User])
    async delete(id: string) {
        const model = getModelForClass(User);
        const user = await model.findByIdAndRemove(
            {_id: id}
        )
        console.log("Hello User deleted", user)
        return model.find()
    }

    @Query(() => [User])
    async findByRole(role: string): Promise<User[]>{
        const model = getModelForClass(User);
        return await model.find({role: {$eq: role}})
    }
}

export const UserService = new UserServiceClass();