import { getModelForClass } from "@typegoose/typegoose";
import { Request, Response } from "express";
import { Arg, Resolver, Mutation, Query } from "type-graphql";
import { Slide } from "../entities/Slide";
import { SlideService } from '../services/SlideService'

@Resolver(() => Slide)
export class SlideController {

  @Mutation(() => Slide)
  public async createSlide(@Arg('data', () => Slide) data: Slide): Promise<Slide> {
    return SlideService.create(data)
  }
  
  @Mutation(() => Slide)
  public async deleteSlide(@Arg('_id') _id: string): Promise<Slide> {
    return SlideService.delete(_id)
  }

  @Query(() => Slide)
  public async findOne(@Arg('_id') _id: string): Promise<Slide> {
    return SlideService.findById(_id)
  }
}