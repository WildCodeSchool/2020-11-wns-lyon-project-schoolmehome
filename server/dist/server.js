"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordAuthChecker = void 0;
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const typegoose_1 = require("@typegoose/typegoose");
const User_1 = require("./entities/User");
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const UserResolver_1 = require("./resolvers/UserResolver");
const SlideResolver_1 = require("./resolvers/SlideResolver");
const PresentationResolver_1 = require("./resolvers/PresentationResolver");
const LessonResolver_1 = require("./resolvers/LessonResolver");
const AuthService_1 = require("./services/AuthService");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const passwordAuthChecker = async ({ context }, roles) => {
    try {
        const token = context.req.cookies.appSession;
        if (token) {
            const data = AuthService_1.Auth.decodeToken(token);
            const model = typegoose_1.getModelForClass(User_1.User);
            const user = await model.findById(data.userId);
            context.user = user;
            if (roles.length > 0) {
                if (roles.find(e => e === user.role)) {
                    return true;
                }
                return false;
            }
            return true;
        }
        else {
            return false;
        }
    }
    catch (_a) {
        return false;
    }
};
exports.passwordAuthChecker = passwordAuthChecker;
(async () => {
    await typegoose_1.mongoose.connect('mongodb://mongodb:27017/', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "home" });
    const schema = await type_graphql_1.buildSchema({
        resolvers: [UserResolver_1.UserResolver, SlideResolver_1.SlideResolver, PresentationResolver_1.PresentationResolver, LessonResolver_1.LessonResolver],
        authChecker: exports.passwordAuthChecker
    });
    const server = new apollo_server_express_1.ApolloServer({
        schema,
        playground: true,
        context: ({ req, res }) => ({ req, res })
    });
    const app = express_1.default();
    app.use(cors_1.default());
    app.use(cookie_parser_1.default());
    server.applyMiddleware({ app, cors: false });
    app.listen({ port: 4300 }, () => console.log(`Server ready at http://localhost:4300${server.graphqlPath}`));
})();
