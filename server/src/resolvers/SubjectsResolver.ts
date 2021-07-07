import { Subject } from "../entities/Subject";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { getModelForClass } from "@typegoose/typegoose";


@Resolver(() => Subject)
export class SubjectResolver {

    @Mutation(() => Subject)
    public async createSubject(@Arg('data') data: Subject): Promise<Subject> {
        const model = getModelForClass(Subject)
        return await model.create(data)
    }

    @Query(() => [Subject])
    public async getAllSubjects(): Promise<Subject[]> {
        const model = getModelForClass(Subject)
        return await model.find();
    }

        //    public async create(@Arg('data') data: Subject): Promise<Subject>{
        //     const model =  getModelForClass(Subject)
        //     return await model.create(data)
        // }
        // public async read (@Arg('data') data: Subject): Promise<Subject[]>{
        //     const model = getModelForClass(Subject)
        //     const subjects = await model.find()
        //         .populate("promo")
        //         .populate("lessons")
        //         .populate("subject")
        //     return subjects
        // }
        // A Modifier pour les id
        // public async patch (@Arg('data') data: Subject): Promise<Subject> {
        //     const model = getModelForClass(Subject)
        //     const student = await model.findOne({"_id": data._id})
        //     Object.assign(student, data)
        //     return await model.create()
        // }
        // public async  update(@Arg('data') data: Subject): Promise<Subject>{
        //     const model = getModelForClass(Subject);
        //     const subjectId = data._id
        //     const student = await model.findOne({"_id": subjectId})
        //     Object.assign(data._id, data)
        //     return await model.create(student)
        // }
        // public async findOne(@Arg('data') data: Subject): Promise<Subject>{
        //     const model = getModelForClass(Subject);
        //     const subjectId = data._id
        //     return await model.findOne({"_id": subjectId})
        //         .populate("promo")
        //         .populate("lessons")
        //         .populate("subject")
        // }

    }
