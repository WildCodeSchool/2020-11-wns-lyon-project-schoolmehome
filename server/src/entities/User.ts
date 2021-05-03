import {  mongoose, prop } from "@typegoose/typegoose";
import { IsDate, IsEmail, IsIn, IsPhoneNumber, Length } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType('UserType')
@InputType('UserInput')
export class User {
   @Field({ nullable: true })
   _id!: string;

   @Field({nullable :  true})
   @prop()
   firstName!: string;

   @Field({nullable : true})
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

   @Field({nullable : true})
   @prop()
   phone! : string;

   @Field({nullable : true})
   @prop()
   birthdate! : string;

   @Field({nullable : true})
   @prop()
   street! : string

   @Field({nullable : true})
   @prop()
   zipcode! : string

   @Field({nullable : true})
   @prop()
   city! : string

   @Field({nullable :  true})
   @prop()
   role!: string;

}
@InputType('UserUpdate')
export class UserUpdate{
   @Field({nullable :  true})
   @Length(2, 20)
   @prop()
   firstName?: string;

   @Field({nullable : true})
   @Length(3, 20)
   @prop()
   lastName?: string;
   
   @Field({nullable :  true})
   @IsEmail()
   @Length(3, 100)
   @prop()
   email?: string;
}

mongoose.set('useFindAndModify', false);

