import {Subject} from "./Subject";
import {Student} from "./Student";
import { Field, InputType, ObjectType } from "type-graphql";
import { prop } from "@typegoose/typegoose";
@ObjectType('PromoType')
@InputType('PromoInput')
export  class Promo {
    @Field()
    @prop()
    name!: string;

    @Field(() => [Student])
    @prop()
    students!: Student[];

    @Field(() => [Subject])
    @prop()
    subject !: Subject[];
}
