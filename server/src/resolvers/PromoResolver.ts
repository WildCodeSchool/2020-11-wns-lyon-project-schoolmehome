
import { Promo } from '../entities/Promo';
import { arrayNotEmpty } from "class-validator";
import { Arg, Mutation } from 'type-graphql';
import { getModelForClass } from '@typegoose/typegoose';


export class PromoResolver {

    @Mutation(() => Promo)
    public async createPromo(@Arg('data') data: Promo): Promise<Promo> {
        const model = getModelForClass(Promo)
        return await model.create(data)
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
}
