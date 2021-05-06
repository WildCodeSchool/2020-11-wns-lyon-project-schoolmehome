import * as jwt from 'jsonwebtoken';
import * as argon from 'argon2'
import { UserService } from './UserService';
import { getModelForClass } from '@typegoose/typegoose';
import { User } from '../entities/User';
import { Arg, Mutation } from 'type-graphql';
import { Mail } from '../services/MailService';
import { AuthResult } from '../entities/AuthResult';
import { Teacher } from '../entities/Teacher';

export class AuthService {
    @Mutation(() => User) 
    public async create(data: User){
        const model = getModelForClass(User);
        const userToken = {data : data.email};
        const token =  jwt.sign(userToken, "secret");
        //renvoyer le token par mail
        const user = await model.create(data);
        return {token, user};
    }

    @Mutation(() => User) 
    public async createTeacher(data: Teacher){
        const model = getModelForClass(Teacher);
        const userToken = {data : data.email};
        const token =  jwt.sign(userToken, "secret");
        //renvoyer le token par mail
        const teacher = await model.create(data);
        return {token, teacher};
    }

    public async signin(email, password, ctx){
        const model = getModelForClass(User);
        const user = await model.findOne({ email });
        if (user && await argon.verify(user.password, password) === true) {
            const UserToken = {userId: user.id};
            const token = jwt.sign(UserToken, "secret");
            ctx.res.cookie('appSession', token, { maxAge: 60, httpOnly: true });
            return { token, user };
        } 
    }
    @Mutation(() => AuthResult, {nullable : true})
    public async passwordLost(@Arg('email') email: string){
        const user =  await UserService.findByEmail(email);
        if (user) {
            const provisoryToken = {userEmail : user.email, userFirstName : user.firstName, userLastName : user.lastName};
            const token = jwt.sign(provisoryToken, "secret");
            await Mail.main(email, token)
            return {user, token}
        }
    }
    public decodeToken( token):any{
        return jwt.verify(token, "secret")
    }
    @Mutation(() => User)
    public async verifyToken(@Arg('token') token :string) :Promise<User>{
        const authorization= token
        const bearerToken = authorization.split(' ')[1];
        const secret = "secret"
        const result: any = await jwt.verify(bearerToken, secret);
        const user = UserService.findByEmail(result.email)
        if (user) {
            return user;
        }
        return null as any
    }
    
}
export const Auth = new AuthService()
