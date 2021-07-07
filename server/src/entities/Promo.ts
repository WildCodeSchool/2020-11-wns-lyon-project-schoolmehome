import {Subject} from "./Subject";
import {User} from "./User";
import { Field, InputType, ObjectType } from "type-graphql";
import { prop } from "@typegoose/typegoose";
@ObjectType('PromoType')
@InputType('PromoInput')
export  class Promo {
    @Field({ nullable: true })
    _id: string;

    @Field()
    @prop()
    name!: string;

    // @Field(() => [User])
    // @prop()
    // students!: User[];

    // @Field(() => [Subject])
    // @prop()
    // subject !: Subject[];
}
