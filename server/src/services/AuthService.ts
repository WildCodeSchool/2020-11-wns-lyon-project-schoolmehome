import * as jwt from 'jsonwebtoken';
import * as argon from 'argon2'
import { UserService } from './UserService';
import { getModelForClass } from '@typegoose/typegoose';
import { User, UserUpdate } from '../entities/User';
import { Arg, Ctx, Mutation } from 'type-graphql';
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
            const UserToken = {userId: user.id, nale: user.firstName};
            const token = jwt.sign(UserToken, "secret");
            ctx.res.cookie('appSession', token, { maxAge: 60, httpOnly: true });
            return { token, user };
        } 
    }

    public async passwordLost(email: string){
        const model = getModelForClass(User);
        let user =  await model.findOne({ email });
        if (user) {
            const provisoryToken = {userId: user.id};
            const provisoryTokenTime = {expiresIn: "15m"};
            const token = jwt.sign(provisoryToken, "secret", provisoryTokenTime);
            user.restoreToken = token;
            user.save();
            console.log('USERSAVE');
            return Mail.mail(user.email, token);
        }else{
            return null
        }
    }
    public async restorePassword(token: string, password: string, email: string){
        const model = getModelForClass(User);
        const secret = "secret"
        let user  =  await model.findOne({email});
        if (user) {
            const result: any = await jwt.verify(token, secret);
            if (result && token === user.restoreToken) {
                user.password = await argon.hash(password);
                user.restoreToken = null;
                await user.save();
                console.log(user)
                return {user};
            }else{
                return jwt.JsonWebTokenError;
            }
        }else{
            return null;
        }
    }
    public decodeToken(token):any{
        return jwt.verify(token, "secret")
    }
    
}
export const Auth = new AuthService()
