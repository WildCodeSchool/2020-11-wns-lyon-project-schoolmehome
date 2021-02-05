import { prop } from '@typegoose/typegoose';
import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType('SlideType')
@InputType('SlideInput')
export class Slide {
  @Field({ nullable: true })
  _id: string;
  @Field({ nullable: true })
  @prop()
  title: String;
  @Field({ nullable: true })
  @prop()
  order: number;
  @Field({ nullable: true })
  @prop()
  htmlContent: String;
}