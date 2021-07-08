
import { Promo } from '../entities/Promo';
import { User } from '../entities/User';
import { arrayNotEmpty } from "class-validator";
import { Arg, Mutation, Resolver } from 'type-graphql';
import { getModelForClass } from '@typegoose/typegoose';

@Resolver(() => Promo)
export class PromoResolver {

    @Mutation(() => Promo)
    public async createPromo(@Arg('promo') promo: Promo): Promise<Promo> {
        const model = getModelForClass(Promo)
        return await model.create(promo)
    }

    // // Function à modifier car pas d'id dans promo...
    // public async promoLesson(@Arg('data') data: Promo): Promise<Promo> {
    //     const model = getModelForClass(Promo);
    //     const promoId = data.name
    //     return await model.findOne({ "name": promoId })
    //         .populate("students", "user _id")
    //         .populate("lessons")
    //         .select("lessons")
    // }
    // // Function à modifier...
    // public async promoHasLesson(@Arg('data') data: Promo): Promise<Promo[]> {
    //     const model = getModelForClass(Promo);
    //     return await model.find()
    //         .populate("students")
    //         .populate("lessons")
    //         .then((promos: Promo[]) => {
    //             const promoWithLessons = promos.filter((lesson) =>
    //                 arrayNotEmpty(lesson)
    //             )
    //             if (arrayNotEmpty(promoWithLessons)) {
    //                 return promoWithLessons
    //             } else {
    //                 return null;
    //             }
    //         });
    // }

    // Function à modifier...
    public async promoHasLesson(@Arg('data') data: Promo): Promise<Promo[]> {
        const model = getModelForClass(Promo);
        return await model.find()
            .populate("students")
            .populate("lessons")
            .then((promos: Promo[]) => {
                const promoWithLessons = promos.filter((lesson) =>
                    arrayNotEmpty(lesson)
                )
                if (arrayNotEmpty(promoWithLessons)) {
                    return promoWithLessons
                } else {
                    return null;
                }
            });
    }

    public async findOne(@Arg('data') data: User): Promise<User> {
        const model = getModelForClass(User);
        const teacherId = data._id
        return await model.findOne({"_id": teacherId})
            .populate("promo")
            .populate("lessons")
            .populate("subject")
    }
}
