import { User } from '../entities/User';
import { Slide } from '../entities/Slide';
import { Presentation } from '../entities/Presentation';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { getModelForClass } from '@typegoose/typegoose';

export class PresentationServiceClass{
    
    // @Mutation(() => Slide)
    // public async create (newSlide:Slide): Promise<Slide> {   
    //     const model = getModelForClass(Slide);
    //     return await model.create(newSlide);    
    // }
    
    @Query(() => Presentation)
    public async findById(_id: string): Promise<Presentation>{
        const model = getModelForClass(Presentation);
        return await model.findOne({_id});
    }

    @Query(() => [Presentation])
    public async findAll(): Promise<Presentation[]>{
        const model = getModelForClass(Presentation);
        return await model.find({})
    }

    @Mutation(() => Presentation)
    public async delete(_id: string): Promise<Presentation> {
      const model = getModelForClass(Presentation);
      const deletedPresentation = this.findById(_id)
      await model.deleteOne({ _id });
      return deletedPresentation;
    }

    @Mutation(() => Presentation)
    public async update(@Arg('data') data: Presentation): Promise<Presentation> {
        const model = getModelForClass(Presentation);
        const update = model.findByIdAndUpdate({_id: data._id},
            {$set: data},
            {new: true})
        return update;
    }

}
export const presentationService = new PresentationServiceClass();