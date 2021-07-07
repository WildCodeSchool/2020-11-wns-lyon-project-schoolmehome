import {Promo} from '../entities/Promo';
import {Teacher} from "../entities/Teacher";
import {arrayNotEmpty} from "class-validator";
import {Arg, Mutation, Resolver} from 'type-graphql';
import {getModelForClass} from '@typegoose/typegoose';

@Resolver(() => Promo)
export class PromoResolver {

    @Mutation(() => Promo)
    public async createPromo(@Arg('data') data: Promo): Promise<Promo> {
        const model = getModelForClass(Promo)
        return await model.create(data)
    }

    public async read(@Arg('data') data: Teacher): Promise<Teacher[]> {
        const model = getModelForClass(Teacher)
        const teachers = await model.find()
            .populate("promo")
            .populate("lessons")
            .populate("subject")
        return teachers
    }

    public async patch(@Arg('data') data: Teacher): Promise<Teacher> {
        const model = getModelForClass(Teacher)
        const teacher = await model.findOne({"_id": data._id})
        Object.assign(teacher, data)
        return await model.create()
    }

    public async update(@Arg('data') data: Teacher): Promise<Teacher> {
        const model = getModelForClass(Teacher);
        const teacherId = data._id
        const teacher = await model.findOne({"_id": teacherId})
        Object.assign(data._id, data)
        return await model.create(teacher)
    }

    public async findOne(@Arg('data') data: Teacher): Promise<Teacher> {
        const model = getModelForClass(Teacher);
        const teacherId = data._id
        return await model.findOne({"_id": teacherId})
            .populate("promo")
            .populate("lessons")
            .populate("subject")
    }

    // Function à modifier car pas d'id dans promo...
    public async promoLesson(@Arg('data') data: Promo): Promise<Promo> {
        const model = getModelForClass(Promo);
        const promoId = data.name
        return await model.findOne({"name": promoId})
            .populate("students", "user _id")
            .populate("lessons")
            .select("lessons")
    }

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
}
