import { Lesson } from '../entities/Lesson';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { getModelForClass } from '@typegoose/typegoose';

export class LessonServiceClass{
    
    @Query(() => [Lesson])
    public async findAll(): Promise<Lesson[]>{
        const model = getModelForClass(Lesson);
        return await model.find({})
    }

}
export const lessonService = new LessonServiceClass();