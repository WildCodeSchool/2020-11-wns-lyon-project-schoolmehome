import {User} from '../entities/User';
import {Arg, Mutation, Query} from 'type-graphql';
import {getModelForClass} from '@typegoose/typegoose';



export class UserServiceClass {

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
        return model.find()
    }
}

export const UserService = new UserServiceClass();