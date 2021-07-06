import { Lesson } from '../entities/Lesson';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { getModelForClass } from '@typegoose/typegoose';

export class LessonServiceClass{
    
    @Query(() => [Lesson])
    public async findAll(): Promise<Lesson[]>{
        const model = getModelForClass(Lesson);
        return await model.find({})
    }

    
    @Mutation(() => Lesson)
    public async create(newLesson: Lesson): Promise<Lesson> {
        const model = getModelForClass(Lesson);
        return await model.create(newLesson);
    }

    @Query(() => Lesson)
    public async findOne(_id: string): Promise<Lesson>{
        const model = getModelForClass(Lesson);
        return await model.findOne({ _id })
    }


}
export const lessonService = new LessonServiceClass();