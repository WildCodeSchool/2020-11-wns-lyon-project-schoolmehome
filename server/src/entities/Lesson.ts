import { prop } from "@typegoose/typegoose";
import { Field, InputType, ObjectType } from "type-graphql";
import { Presentation } from "./Presentation";
import { Promo } from "./Promo";
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

  @Field(() => Promo, { nullable: true} )
  @prop({ref: () => Promo})
  promo: Promo;

  @Field(() => Subject,{ nullable: true })
  @prop()
  subject: Subject;

  @Field({ nullable: true} )
  @prop({ref: () => Presentation})
  presentation?: Presentation;
}