import * as jwt from 'jsonwebtoken';
import * as argon from 'argon2'
import { getModelForClass } from '@typegoose/typegoose';
import { User} from '../entities/User';
import { Mutation } from 'type-graphql';
import { Mail } from '../services/MailService';

export class AuthService {

    @Mutation(() => User) 
    public async createUser(data){
        const model = getModelForClass(User);
        const userToken = {data : data.email};
        data.password = null;
        const token =  jwt.sign(userToken, "secret");
        const user = await model.create(data);
        await Mail.mail(token, data.email);
        return user;
    }

    @Mutation(() => User)
    public async createPassword(data: User): Promise<User> {
        const model = getModelForClass(User);
        let email = data.email;
        let password = await argon.hash(data.password);
        let user =  await model.findOne({ email });
        if (user) {
            user.password = password;
            await user.save();
            return user;
        }else{
            return null;
        }
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
