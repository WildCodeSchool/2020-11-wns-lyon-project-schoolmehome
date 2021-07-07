import { getModelForClass } from "@typegoose/typegoose";
import { Request, Response } from "express";
import { Arg, Resolver, Mutation, Query } from "type-graphql";
import { Slide } from "../entities/Slide";
import { Presentation } from "../entities/Presentation";
import { SlideService } from '../services/SlideService';
import { presentationService } from '../services/PresentationService';

@Resolver(() => Presentation)
export class PresentationResolver {

  @Mutation(() => Presentation)
  public async createPresentation(@Arg('data') data: Presentation): Promise<Presentation> {
    const model = getModelForClass(Presentation)
    return await model.create(data)
  }

  @Query(() => Presentation)
  public async findOnePresentation(@Arg('_id') _id: string): Promise<Presentation> {
    return await presentationService.findById(_id);
  }

  @Query(() => [Presentation])
  public async findAllPresentation(): Promise<Presentation[]> {
    return await presentationService.findAll();
  }

  @Mutation(() => Presentation)
  public async deletePresentation(@Arg('_id') _id: string): Promise<Presentation> {
    return presentationService.delete(_id)
  }

  @Mutation(() => Presentation)
  public async addSlide(@Arg('data') data: Slide, @Arg('_id') _id: string): Promise<Presentation> {
    const model = getModelForClass(Presentation)
    const presentation = await model.findById(_id);
    data.order = presentation.slides.length;
    const newSlide = await SlideService.create(data)
    const newPresentation = await model.findByIdAndUpdate(
      { _id },
      { slides: [...presentation.slides, newSlide] },
      { new: true })
    return newPresentation;
  }

  @Mutation(() => Presentation)
  public async updatePresentation(@Arg('data') data: Presentation): Promise<Presentation> {
    return await presentationService.update(data);
  }
} 