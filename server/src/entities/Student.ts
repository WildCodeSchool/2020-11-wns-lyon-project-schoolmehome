import {User} from './User';
import {Subject} from './Subject';
import {Promo} from './Promo';
import { Field, InputType, ObjectType } from 'type-graphql';
import { prop } from '@typegoose/typegoose';
@ObjectType('StudentType')
@InputType('StudentInput')
export class Student extends User {
    @Field(() => [Subject])
    @prop()
    subject!: Subject[];
    
    @Field(() => [Promo])
    @prop()
    promo!: Promo[];
}