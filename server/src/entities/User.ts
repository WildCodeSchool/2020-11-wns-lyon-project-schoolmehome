import { mongoose, prop } from "@typegoose/typegoose";
import { IsDate, IsEmail, IsIn, IsPhoneNumber, Length } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import {Lesson} from './Lesson';
import { Subject } from "./Subject";
import { Promo } from "./Promo";

@ObjectType('UserType')
@InputType('UserInput')
export class User {
  @Field({ nullable: true })
  _id!: string;

  @Field({ nullable: true })
  @prop()
  firstName!: string;

  @Field({ nullable: true })
  @prop()
  lastName!: string;

  @Field()
  @IsEmail()
  @Length(3, 100)
  @prop()
  email!: string;

  @Field({ nullable: true })
  // @Length(8, 50)
  @prop()
  password!: string;

  @Field({ nullable: true })
  @prop()
  phone!: string;

  @Field({ nullable: true })
  @prop()
  birthdate!: string;

  @Field({ nullable: true })
  @prop()
  street!: string

  @Field({ nullable: true })
  @prop()
  zipcode!: string

  @Field({ nullable: true })
  @prop()
  city!: string

  @Field({nullable : true})
  @prop()
  imageUrl! : string

  @Field()
  @prop()
  @IsIn(['Admin', 'User', 'Teacher'])
  role!: string;

  @Field(() => [Lesson], { nullable: true} )
  @prop({ref: () => Lesson})
  lessons: Lesson[];

  @Field({nullable: true} )
  @prop()
  promo: string;

  @Field(() => [Subject], {nullable: true})
  @prop()
  subject: Subject[];
  
  @Field({nullable: true})
  @prop()
  restoreToken!: string;
}
@ObjectType('UserUpdateObject')
@InputType('UserUpdateInput')
export class UserUpdate {
  @Field({ nullable: true })
  @Length(2, 20)
  @prop()
  firstName?: string;

  @Field({ nullable: true })
  @Length(3, 20)
  @prop()
  lastName?: string;

  @Field({ nullable: true })
  @IsEmail()
  @Length(3, 100)
  @prop()
  email?: string;
}

mongoose.set('useFindAndModify', false);


