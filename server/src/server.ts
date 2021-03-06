import 'reflect-metadata';
import { AuthChecker, buildSchema } from "type-graphql";
import { getModelForClass, mongoose } from '@typegoose/typegoose';
import { User } from './entities/User';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {Auth}  from './services/AuthService'
import dotenv from 'dotenv';
dotenv.config();

export const passwordAuthChecker: AuthChecker = async ({ context }: any, roles) => {
    try {
        const token = context.req.cookies.appSession;
        if (token) {
            const data = Auth.decodeToken(token);
            const model = getModelForClass(User);
            const user = await model.findById(data.userId);
            context.user = user;
            if (roles.length > 0) {
                if (roles.find(e => e === user.role)) {
                    return true;
                } return false
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
    try {
        await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, dbName: process.env.DB_NAME });
        const schema = await buildSchema({
            resolvers: [__dirname + '/resolvers/*.{ts,js}'],
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

        app.listen({ port: 4300 }, () =>
            console.log(`Server ready at http://localhost:4300${server.graphqlPath}`)
        );
    }
    catch (e) {
        console.error(e)
    }

})();
