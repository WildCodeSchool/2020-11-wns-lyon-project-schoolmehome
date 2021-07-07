import { UserService } from "../services/UserService";
import { Auth } from "../services/AuthService";
import { lessonService } from "../services/LessonService";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User, UserUpdate } from '../entities/User';
import { AuthResult } from '../entities/AuthResult';
import { Lesson } from "../entities/Lesson";
import { getModelForClass } from "@typegoose/typegoose";
import moment from "moment";


@Resolver(() => User)
export class UserResolver {

    @Authorized(['Admin'])
    @Mutation(() => User)
    public async createUser(@Arg('data') data: User): Promise<Boolean>{
        return await Auth.createUser(data);
    }

    @Mutation(() => User)
    public async firstConnexion(@Arg('data', () => User) data: User): Promise<User> {
        return await Auth.createPassword(data);
    };

    @Authorized()
    public async authenticatedUser(@Ctx() ctx): Promise<User> {
        return ctx.user;
    }

    @Mutation(() => AuthResult, { nullable: true })
    public async signin(@Arg('email') email: string, @Arg('password') password: string, @Ctx() ctx): Promise<AuthResult> {
        return await Auth.signin(email, password, ctx);
    }
    @Mutation(() => AuthResult, { nullable: true })
    public async lost(@Arg('email') email: string){
        return await Auth.passwordLost(email);
    }

    @Mutation(() => AuthResult, { nullable: true })
    public async resetPassword(@Arg('token') token: string, @Arg('password') password: string, @Arg('email') email: string){
        return Auth.restorePassword(token, password, email);
    }
    // @Authorized(['Admin'])
    @Query(() => User)
    public async getOne(@Arg('email') email: string): Promise<User>{
        return await UserService.findByEmail(email);
    }

    @Mutation(() => User, {nullable : true})
    public async update(@Arg('data') data: User){
        console.log(data);
        return await UserService.updateOne(data)
    }



  @Mutation(() => Lesson)
  public async addLesson(@Arg('data') data: Lesson, @Arg('_id') _id: string): Promise<Lesson> {
    const model = getModelForClass(User)
    const presentation = await model.findById(_id);
    const newLesson = await lessonService.create(data)
    const newUser = await model.findByIdAndUpdate(
      { _id },
      { lessons: [...presentation.lessons, newLesson] },
      { new: true })
    return newLesson;
  }

  @Query(() => Lesson, { nullable: true })
  public async findNextlesson(@Arg('email') email: string): Promise<Lesson>{

    const model = getModelForClass(User)
    const lessonModel = getModelForClass(Lesson);
    const teacher = await model.findOne({email}).populate('lessons', undefined, lessonModel).exec()
    if(teacher.lessons.length === 0)
      return null

    return teacher.lessons
      .filter(l => moment(l.start) > moment(Date.now()))
      .sort((a, b) => (a.start > b.start) ? 1 : ((b.start > a.start) ? -1 : 0))[0]
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

    @Authorized(['Admin'])
    @Mutation(() => [User])
    public async delete(@Arg('id') id: string){
        return await UserService.delete(id)
    }

    @Query(() => [User])
    public async findUsersByRole(@Arg('role') role: string): Promise<User[]>{
        return await UserService.findByRole(role);
    }
}
