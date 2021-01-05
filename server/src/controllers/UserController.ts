import {UserService} from "../services/UserService";
import { Auth } from "../services/AuthService";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User } from '../models/Class/User';
import { AuthResult } from '../models/Class/AuthResult';

@Resolver(() => User)
export class UserController{
    @Query(() => User)
    @Authorized()
    public async authenticatedUser(@Ctx() ctx): Promise<User> {
        return ctx.user;
    }
    @Mutation(() => User)
    public async signup(@Arg('data', () => User) data: User): Promise<User> {
        return await UserService.signUp(data);
    };

    @Mutation(() => AuthResult, { nullable: true })
    public async signin(@Arg('email') email: string, @Arg('password') password: string): Promise<AuthResult> {
        return await Auth.signin(email, password);
    }

    @Mutation(() => User, { nullable: true })
    public async lost(@Arg('email') email: string){
        return await UserService.lostPassword(email);
    }
    @Query(() => User)
    public async getOne(@Arg('email') email: string){
        return await UserService.findByEmail(email);
    }
    @Mutation(() => User, {nullable : true})
    public async update(@Arg('data') data: User){
        return await UserService.updateOne(data)
    }
    @Mutation(() => User)
    public async verifyToken(@Arg('token') token :string) :Promise<User>{
        return await Auth.verifyToken(token)
       
    }
}