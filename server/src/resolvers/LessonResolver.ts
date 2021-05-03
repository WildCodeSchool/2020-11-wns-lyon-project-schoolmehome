import { getModelForClass } from '@typegoose/typegoose';
import { Arg } from 'type-graphql';
import {Lesson} from "../entities/Lesson";


export class LessonResolver {
    public async create(@Arg('data') data: Lesson): Promise<Lesson>{
        const model =  getModelForClass(Lesson)
        return await model.create(data)
    }

    public async read (@Arg('data') data: Lesson): Promise<Lesson[]>{
        const model = getModelForClass(Lesson)
        const Lessons = await model.find()
            .populate("promo")
            .populate("lessons")
            .populate("subject")
        return Lessons
    }
    // A modifier normalement la méthode appel un findById
    public async patch (@Arg('data') data: Lesson): Promise<Lesson> {
        const model = getModelForClass(Lesson)
        const lesson = await model.find({"name": data.name})
        Object.assign(lesson, data)
        return await model.create()
    }
    /*
import { Request, Response } from 'express';
import { Arg, Resolver, Mutation, Query } from "type-graphql";
import { Lesson } from "../entities/Lesson";
import { lessonService } from '../services/LessonService';


@Resolver(() => Lesson)
export class LessonController {

  @Mutation(() => Lesson)
  public async createLesson(@Arg('data') data: Lesson): Promise<Lesson> {
    const model = getModelForClass(Lesson)
    return await model.create(data)
  }

  @Query(() => [Lesson])
  public async findAllLesson(): Promise<Lesson[]> {
    return await lessonService.findAll();
  }

  // public async read(@Arg('data') data: Lesson): Promise<Lesson[]> {
  //   const model = getModelForClass(Lesson)
  //   const Lessons = await model.find()
  //     .populate("promo")
  //     .populate("lessons")
  //     .populate("subject")
  //   return Lessons
  // }
  // // A modifier normalement la méthode appel un findById
  // public async patch(@Arg('data') data: Lesson): Promise<Lesson> {
  //   const model = getModelForClass(Lesson)
  //   const lesson = await model.find({ "name": data.name })
  //   Object.assign(lesson, data)
  //   return await model.create()
  // }
  /*
METHODES à modifierProblème avec ID
  public async  update(@Arg('data') data: Lesson): Promise<Lesson>{
      const model = getModelForClass(Lesson);
      const lessonId = data._id
      const lesson = await model.findOne({"_id": lessonId})
      Object.assign(data._id, data)
      return await model.create(Lesson)
  }
 

  public async findOne(@Arg('data') data: Lesson): Promise<Lesson>{
      const model = getModelForClass(Lesson);
      const LessonId = data._id
      return await model.findOne({"_id": LessonId})
          .populate("promo")
          .populate("lessons")
          .populate("subject")
  }
   */
}
