import { getModelForClass } from '@typegoose/typegoose';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import {Lesson} from "../entities/Lesson";
import { Presentation } from '../entities/Presentation';
import { lessonService } from '../services/LessonService';
import { presentationService } from '../services/PresentationService';

@Resolver(() => Lesson)
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

    @Query(() => Lesson)
    public async findOneLesson(@Arg('_id') _id: string): Promise<Lesson> {
      return lessonService.findOne(_id)
    }

    @Mutation(() => Lesson)
    public async addPresentation(@Arg('data') data: Presentation, @Arg('_id') _id: string): Promise<Lesson> {
      const model = getModelForClass(Lesson)
      const lesson = await model.findById(_id);
      const newPresentation = await presentationService.add(data);
      const newLesson = await model.findByIdAndUpdate(
        { _id },
        { presentation: [...lesson.presentation, newPresentation] },
        { new: true })
      return newLesson;
    }

    @Mutation(() => Lesson)
    public async UpdateLesson(@Arg('data') data: Lesson, @Arg('_id') _id: string): Promise<Lesson> {
      const model = getModelForClass(Lesson)
      const lesson = await model.findById(_id);
      console.log(_id)
      const newLesson = await model.findByIdAndUpdate(
        { _id },
        { start: data.start || lesson.start,
          end: data.end || lesson.start, 
          promo: data.promo || lesson.promo, 
          subject: data.subject || lesson.subject},
        { new: true })

      return newLesson;
    }

    //A modifier normalement la méthode appel un findById
    // public async patch (@Arg('data') data: Lesson): Promise<Lesson> {
    //     const model = getModelForClass(Lesson)
    //     const lesson = await model.find({"name": data.name})
    //     Object.assign(lesson, data)
    //     return await model.create()
    // }
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
