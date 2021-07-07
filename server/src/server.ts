import 'reflect-metadata';
import { AuthChecker, buildSchema } from "type-graphql";
import { getModelForClass, mongoose } from '@typegoose/typegoose';
import { User } from './entities/User';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { UserResolver } from './resolvers/UserResolver';
import { SlideResolver } from './resolvers/SlideResolver';
import { PresentationResolver } from './resolvers/PresentationResolver';
import { LessonResolver } from './resolvers/LessonResolver';
import { TeacherResolver } from './resolvers/TeacherResolver';
import { PromoResolver } from './resolvers/PromoResolver';
import {Auth}  from './services/AuthService'
import path from 'path';

export const passwordAuthChecker: AuthChecker = async ({ context }: any, roles) => {
    try {
        const token = context.req.cookies.appSession;
        if (token) {
            const data = Auth.decodeToken(token);
            const model = getModelForClass(User);
            const user = await model.findById(data.userId);
            context.user = user;
            if (roles.length > 0){
                if(roles.find(e => e === user.role)){
                    return true;
                }return false
            }
            return true
        } else {
            return false;
        }
    } catch {
        return false;
    }
};
(async () => {
    await mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "home" });
    console.log(__dirname + '/resolvers/')
    const schema = await buildSchema({
        resolvers: [__dirname + '/resolvers/*.{ts,js}'],
        // resolvers: [UserResolver, SlideResolver, PresentationResolver, LessonResolver, TeacherResolver, PromoResolver],
        authChecker: passwordAuthChecker
    });

    const server = new ApolloServer({
        schema,
        playground: true,
        context: ({ req, res }) => ({ req, res })
    });

    const app = express();
    app.use(cors());
    app.use(cookieParser());

    server.applyMiddleware({ app, cors: false });

    app.listen({ port: 4301 }, () =>
        console.log(`Server ready at http://localhost:4301${server.graphqlPath}`)
    );
})();
