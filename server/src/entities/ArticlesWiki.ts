import { modelOptions, mongoose, prop, Ref } from "@typegoose/typegoose";
import { ArgsType, Field, InputType, ObjectType } from "type-graphql";
import { VersionsWiki, VersionsWikiInput, VersionsWikiType } from "./VersionsWiki";
import { User } from "./User";
import { Promo } from "./Promo";

@ObjectType()
@InputType()
@modelOptions({schemaOptions : {collection : 'ArticlesWiki'}})
export class ArticlesWiki{

    @Field({ nullable: true })
    _id!: string;

    @Field({ nullable: true })
    @prop()
    title: string;

    @Field()
    @prop()
    createdAt : string;


    @Field()
    @prop()
    isEditing : boolean

}

@ObjectType('ArticlesWikiType')
export class ArticlesWikiType extends ArticlesWiki {
    
    @Field(() => Promo)
    @prop({ref : () => Promo})
    promo : Promo

    @Field(() => User)
    @prop({ref : () => User})
    author : User

    @Field(() => [VersionsWikiType])
    @prop()
    content : VersionsWikiType[]

    @Field(() => VersionsWikiType)
    lastVersion : VersionsWikiType
}

@InputType('ArticlesWikiInput')
export class ArticlesWikiInput extends ArticlesWiki {
    @Field()
    @prop({ref : () => Promo})
    promo : string

    @Field()
    @prop({ref : () => User})
    author : string

    @Field(() => [VersionsWikiInput])
    @prop()
    content : VersionsWikiInput[]
}
