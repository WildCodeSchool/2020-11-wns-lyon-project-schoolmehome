import { User } from '../entities/User';
import { Slide } from '../entities/Slide';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { getModelForClass } from '@typegoose/typegoose';

export class SlideServiceClass {

  @Mutation(() => Slide)
  public async create(newSlide: Slide): Promise<Slide> {
    const model = getModelForClass(Slide);
    return await model.create(newSlide);
  }

  @Query(() => Slide)
  public async findById(_id: string): Promise<Slide> {
    const model = getModelForClass(Slide);
    return await model.findOne({ _id });
  }

  @Mutation(() => Slide)
  public async delete(_id: string): Promise<Slide> {
    const model = getModelForClass(Slide);
    const deletedSlide = this.findById(_id)
    await model.deleteOne({ _id });
    return deletedSlide;
  }

}
export const SlideService = new SlideServiceClass();