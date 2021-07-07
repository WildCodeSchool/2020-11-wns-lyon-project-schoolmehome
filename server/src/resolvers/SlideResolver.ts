import { getModelForClass } from "@typegoose/typegoose";
import { Request, Response } from "express";
import { Arg, Resolver, Mutation, Query, Authorized } from "type-graphql";
import { Slide } from "../entities/Slide";
import { SlideService } from '../services/SlideService'

@Resolver(() => Slide)
export class SlideResolver {

  @Authorized(['Admin', 'Teacher'])
  @Mutation(() => Slide)
  public async createSlide(@Arg('data', () => Slide) data: Slide): Promise<Slide> {
    return SlideService.create(data)
  }
  
    @Authorized(['Admin', 'Teacher'])

  @Mutation(() => Slide)
  public async deleteSlide(@Arg('_id') _id: string): Promise<Slide> {
    return SlideService.delete(_id)
  }

  @Authorized(['Admin', 'Teacher'])
  @Query(() => Slide)
  public async findOne(@Arg('_id') _id: string): Promise<Slide> {
    return SlideService.findById(_id)
  }
}