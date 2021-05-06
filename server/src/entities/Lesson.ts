import { prop } from "@typegoose/typegoose";
import { Field, InputType, ObjectType } from "type-graphql";
import { Presentation } from "./Presentation";
import { Subject } from "./Subject";

@ObjectType('LessonType')
@InputType('LessonInput')
export class Lesson {

  @Field({ nullable: true })
  _id!: string;

  @Field()
  @prop()
  start!: Date;

  @Field()
  @prop()
  end!: Date;

  @Field()
  @prop()
  promo!: String;

  @Field(() => Subject)
  @prop()
  subject: Subject;

  @Field(() => [Presentation])
  @prop()
  presentation: Presentation[];


}