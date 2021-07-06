import { Field, InputType, ObjectType } from "type-graphql";
import { prop } from "@typegoose/typegoose";
import { Slide } from "./Slide";
import { User } from "./User";

@ObjectType('PresentationType')
@InputType('PresentationInput')
export class Presentation {
  @Field({ nullable: true })
  _id!: string;

  @Field({ nullable: true })
  @prop()
  title: string;

  // @Field()
  // @prop()
  // owner: User["_id"];

  @Field(() => [Slide], { nullable: true })
  @prop()
  slides: Slide[];
}