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

  @Field({ nullable: true })
  @prop()
  promo: String;

  @Field(() => Subject,{ nullable: true })
  @prop()
  subject: Subject;

  @Field({ nullable: true} )
  @prop({ref: () => Presentation})
  presentation?: Presentation;
}