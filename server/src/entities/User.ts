import {  mongoose, prop } from "@typegoose/typegoose";
import { IsEmail, IsIn, Length } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType('UserType')
@InputType('UserInput')
export class User {
   @Field({ nullable: true })
   _id!: string;

   @Field({nullable :  true})
   @Length(2, 20)
   @prop()
   firstName!: string;

   @Field({nullable : true})
   @Length(3, 20)
   @prop()
   lastName!: string;

   @Field({nullable :  true})
   @IsEmail()
   @Length(3, 100)
   @prop()
   email!: string;
   
   @Field({nullable :  true})
   @Length(8, 50)
   @prop()
   password!: string;

   @Field({nullable :  true})
   @prop()
   @IsIn(['Admin', 'User'])
   role!: string;
}
mongoose.set('useFindAndModify', false);
