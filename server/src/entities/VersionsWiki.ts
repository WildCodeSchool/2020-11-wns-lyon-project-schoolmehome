import { modelOptions, prop } from "@typegoose/typegoose";
import { IsIn } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import { User } from "./User";

@ObjectType('VersionsWikiType')
@InputType('VersionsWikiInput')
@modelOptions({schemaOptions : {collection : 'VersionsWiki'}})
export class VersionsWiki{

    @Field({ nullable: true })
    _id!: string;

    @Field({nullable : true})
    @prop()
    createdAt : string

    @Field()
    @prop()
    content : string;

    @Field()
    @prop()
    @IsIn([1, 2, 3])
    isValid : number;

    @Field()
    @prop()
    version : number;

}

@ObjectType('VersionsWikiTypeObject')
export class VersionsWikiType extends VersionsWiki {

    @Field(() => User, {nullable : true})
    @prop({ref : () => User})
    validatorTeacher : User

    @Field(() => User)
    @prop({ref : () => User})
    author : User
}

@ObjectType('VersionsWikiTypeAllObject')
export class VersionsWikiTypeAll extends VersionsWiki {

    @Field({nullable : true})
    @prop({ref : () => User})
    validatorTeacher : string

    @Field()
    @prop({ref : () => User})
    author : string
}

@InputType('VersionsWikiInputType')
export class VersionsWikiInput extends VersionsWiki {
    @Field({nullable : true})
    @prop({ref : () => User})
    validatorTeacher : string

    @Field()
    @prop({ref : () => User})
    author : string
}