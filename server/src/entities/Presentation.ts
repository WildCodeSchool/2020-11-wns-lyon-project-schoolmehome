import { Field, InputType, ObjectType } from "type-graphql";
import { prop } from "@typegoose/typegoose";
import { Slide } from "./Slide";

@ObjectType('PresentationType')
@InputType('PresentationInput')
export class Presentation {
  @Field({ nullable: true })
  _id!: string;

  @Field()
  @prop()
  title: string;

  @Field(() => [Slide])
  @prop()
  slides: Slide[];
}