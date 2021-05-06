import { UserService } from "../services/UserService";
import { Auth } from "../services/AuthService";
import { lessonService } from "../services/LessonService";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User, UserUpdate } from '../entities/User';
import { AuthResult } from '../entities/AuthResult';
import { Document } from "mongoose";
import { Lesson } from "../entities/Lesson";
import { getModelForClass } from "@typegoose/typegoose";

@Resolver(() => User)
export class UserResolver {

  @Query(() => User)

  @Authorized(['Admin'])
  @Mutation(() => AuthResult)
  public async create(@Arg('data') data: User): Promise<AuthResult> {
    return await Auth.create(data);
  }

  @Authorized()
  public async authenticatedUser(@Ctx() ctx): Promise<User> {
    //console.log(ctx.user);
    return ctx.user;
  }

  @Mutation(() => User)
  public async signup(@Arg('data', () => User) data: User): Promise<User> {
    return await UserService.signUp(data);
  };

  @Mutation(() => AuthResult, { nullable: true })
  public async signin(@Arg('email') email: string, @Arg('password') password: string, @Ctx() ctx): Promise<AuthResult> {
    return await Auth.signin(email, password, ctx);
  }
  @Authorized()
  @Mutation(() => User, { nullable: true })
  public async lost(@Arg('email') email: string) {
    return await UserService.lostPassword(email);
  }
  //@Authorized(['Admin'])
  @Query(() => User)
  public async getOne(@Arg('email') email: string): Promise<User> {
    return await UserService.findByEmail(email);
  }
  // @Query(()=> User)
  // public async getOneById(@Arg('id') id: string):Promise<User>{
  //     return await UserService.findById(id);
  // }
  @Mutation(() => User, { nullable: true })
  public async update(@Arg('data') data: User) {
    return await UserService.updateOne(data)
  }
  @Mutation(() => User)
  public async verifyToken(@Arg('token') token: string): Promise<User> {
    return await Auth.verifyToken(token)
  }

  // @Authorized(['Admin'])
  @Query(() => [User])
  public async fetchAll() {
    return await UserService.fetchAll()
  }

  @Query(() => [User])
  public async search(@Arg('name') name: string) {
    return await UserService.search(name)
  }

  @Mutation(() => User)
  public async addLesson(@Arg('data') data: Lesson, @Arg('_id') _id: string): Promise<User> {
    const model = getModelForClass(User)
    const presentation = await model.findById(_id);
    const newLesson = await lessonService.create(data)
    const newUser = await model.findByIdAndUpdate(
      { _id },
      { lessons: [...presentation.lessons, newLesson] },
      { new: true })
    return newUser;
  }
}
