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

}
export const presentationService = new PresentationServiceClass();