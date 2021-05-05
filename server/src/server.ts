import 'reflect-metadata';
import { AuthChecker, buildSchema } from "type-graphql";
import { getModelForClass, mongoose } from '@typegoose/typegoose';
import { User } from './entities/User';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { UserResolver } from './resolvers/UserResolver';
import { SlideController } from './resolvers/SlideController';
import { PresentationController } from './resolvers/PresentationController';
import { LessonResolver } from './resolvers/LessonResolver';
import {Auth}  from './services/AuthService'
import { Server } from 'http';

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

    const schema = await buildSchema({
        resolvers: [UserResolver, SlideController, PresentationController, LessonResolver],
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
    // const test = Server.CreateServer
    // const serverIo = new Server(server, {cors: {origin: '*'}})
    
    app.listen({ port: 4300 }, () =>
        console.log(`Server ready at http://localhost:4300${server.graphqlPath}`)
    );
})();
