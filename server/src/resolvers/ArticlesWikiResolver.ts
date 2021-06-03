
import { getModelForClass, mongoose } from "@typegoose/typegoose";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { ArticlesWiki, ArticlesWikiInput, ArticlesWikiType } from "../entities/ArticlesWiki";
import { Promo } from "../entities/Promo";
import {ObjectId} from "mongodb"
import { User } from "../entities/User";


@Resolver(() => ArticlesWikiType)
export class ArticlesWikiResolver {

    @Query(() => [ArticlesWikiType])
    public async getAllWiki() {
        const model = getModelForClass(ArticlesWikiType);
        const promoModel = getModelForClass(Promo);
        const userModel = getModelForClass(User);
        const all = await model.find()
        .populate('promo',undefined, promoModel)
        .populate('author', undefined, userModel)
        .populate('content.author', undefined, userModel)
        .populate('content.validatorTeacher', undefined, userModel)
        .exec();
        return all.map(w => {
            console.log(w.createdAt);
            const lastIndex = w.content.length -1;
            return {
                ...w.toObject(), 
                lastVersion : w.content[lastIndex],
            }
        });
    }

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
        const w = await model.findById(_id)
        .populate('promo',undefined, promoModel)
        .populate('author', undefined, userModel)
        .populate('content.author', undefined, userModel)
        .populate('content.validatorTeacher', undefined, userModel)
        .exec()
        return {
            ...w.toObject(),
            lastVersion : w.content[w.content.length - 1],
        }
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

    @Query(() => ArticlesWikiType)
    public async isArticleEditing(@Arg('_id') _id: string) : Promise<boolean>{
        const model = getModelForClass(ArticlesWikiType);
        const article = await model.findById(_id);
        if(article.isEditing){
            return true;
        }
        return false;
    }

    @Mutation(() => ArticlesWikiType)
    public async makeArticleEditing(@Arg('_id') _id: string, @Arg('value') value: boolean){
        const model = getModelForClass(ArticlesWikiType);
        if(value){
            setTimeout(async () => {
                await model.findByIdAndUpdate(_id, 
                    {$set: {isEditing : false}},
                    {new: true});
            }, 10000)
        }
        return model.findByIdAndUpdate(_id,
            {$set: {isEditing : value}},
            {new: true});
    }

    @Mutation(() => ArticlesWikiType)
    public async editArticles (@Arg('data') data : ArticlesWikiInput){
        const model = getModelForClass(ArticlesWikiInput);
        return model.findByIdAndUpdate(data._id, {$set : data}, {new : true})
    }

}