import {UserService} from "../services/UserService";
import { Auth } from "../services/AuthService";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User, UserUpdate } from '../entities/User';
import { AuthResult } from '../entities/AuthResult';
import { Document } from "mongoose";

@Resolver(() => User)
export class UserResolver{

    @Query(() => User)

    @Authorized(['Admin'])
    @Mutation(() => AuthResult)
    public async create(@Arg('data') data:User ) : Promise<AuthResult>{
        return await Auth.create(data);
    }
    
    // @Authorized()
    // public async authenticatedUser(@Ctx() ctx): Promise<User> {
    //     //console.log(ctx.user);
    //     return ctx.user;
    // }

    @Mutation(() => User)
    public async signup(@Arg('data', () => User) data: User): Promise<User> {
        return await UserService.signUp(data);
    };

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
    //@Authorized(['Admin'])
    @Query(() => User)
    public async getOne(@Arg('email') email: string): Promise<User>{
        return await UserService.findByEmail(email);
    }

    @Mutation(() => User, {nullable : true})
    public async update(@Arg('data') data: User){
        return await UserService.updateOne(data)
    }


    // @Authorized(['Admin'])
    @Query(() => [User])
    public async fetchAll(){
        return await UserService.fetchAll()
    }

    @Query(() => [User])
    public async search(@Arg('name') name: string) {
        return await UserService.search(name)
    }
}
