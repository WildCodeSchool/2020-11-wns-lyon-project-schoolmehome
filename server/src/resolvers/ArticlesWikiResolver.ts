
import { getModelForClass, mongoose } from "@typegoose/typegoose";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { ArticlesWiki, ArticlesWikiInput, ArticlesWikiType } from "../entities/ArticlesWiki";
import { Promo } from "../entities/Promo";
import {ObjectId} from "mongodb"
import { User } from "../entities/User";


@Resolver(() => ArticlesWikiType)
export class ArticlesWikiResolver {

    @Query(() => [ArticlesWikiType])
    public async getArticlesByPromo(@Arg('promo') promo : string) : Promise<ArticlesWikiType[]> {
        const model = getModelForClass(ArticlesWikiType);
        const promoModel = getModelForClass(Promo);
        console.log(promo);
        const test = await model.find().populate('promo',undefined, promoModel).exec();
        return test.filter( m => m.promo._id == promo)
    }

    @Query(() => ArticlesWikiType)
    public async getArticlesById(@Arg('_id') _id: string) : Promise<ArticlesWikiType>{
        const model = getModelForClass(ArticlesWikiType);
        const promoModel = getModelForClass(Promo);
        const userModel = getModelForClass(User)
        return await model.findById(_id)
        .populate('promo',undefined, promoModel)
        .populate('author', undefined, userModel)
        .populate('content.author', undefined, userModel)
        .populate('content.validatorTeacher', undefined, userModel)
        .exec()
    }

    @Mutation(() => ArticlesWikiType)
    public async createArticles(@Arg('data', () => ArticlesWikiInput) data : ArticlesWikiInput ) : Promise<ArticlesWikiInput> {
        const model = getModelForClass(ArticlesWikiInput);
        return model.create(data);
    }

    @Mutation(() => ArticlesWikiType)
    public async deleteArticles(@Arg('_id') _id: string){
        const model = getModelForClass(ArticlesWikiType);
        return model.findByIdAndDelete(_id);
    }



}