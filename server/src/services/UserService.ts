import { User } from '../entities/User';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { getModelForClass, mongoose } from '@typegoose/typegoose';
import { Lesson } from '../entities/Lesson';
import { Presentation } from '../entities/Presentation';
import { Promo } from '../entities/Promo';
import * as argon from 'argon2'

export class UserServiceClass {

    @Query(() => User)
    public async findByEmail(email: string): Promise<User> {
        const model = getModelForClass(User);
        const lessonModel = getModelForClass(Lesson);
        const presentationModel = getModelForClass(Presentation);
        const promoModel = getModelForClass(Promo);
        const user = await model.findOne({ email })
            .populate({
                path: 'lessons',
                model: lessonModel,
                populate: [{
                    path: 'presentation',
                    model: presentationModel
                },
                {
                    path: 'promo',
                    model: promoModel
                }]
            }).populate({
                path: 'promo',
                model: promoModel,
            })
            .exec()
        return user;
    }

    @Mutation(() => User)
    public async signUp(newUser: User): Promise<User> {
        const model = getModelForClass(User);
        newUser.password = await argon.hash(newUser.password);
        return await model.create(newUser);
    }

    @Mutation(() => User, { nullable: true })
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

    @Query(() => [User])
    async findByRole(role: string): Promise<User[]>{
        const model = getModelForClass(User);
        return await model.find({role: {$eq: role}})
    }
}

export const UserService = new UserServiceClass();