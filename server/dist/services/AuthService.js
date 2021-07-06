"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = exports.AuthService = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const argon = __importStar(require("argon2"));
const typegoose_1 = require("@typegoose/typegoose");
const User_1 = require("../entities/User");
const type_graphql_1 = require("type-graphql");
const MailService_1 = require("../services/MailService");
class AuthService {
    async createUser(data) {
        const model = typegoose_1.getModelForClass(User_1.User);
        const userToken = { data: data.email };
        data.password = null;
        const token = jwt.sign(userToken, "secret");
        const user = await model.create(data);
        await MailService_1.Mail.mail(token, user.email);
        return data;
    }
    async createPassword(newUser) {
        const model = typegoose_1.getModelForClass(User_1.User);
        let email = newUser.email;
        let password = await argon.hash(newUser.password);
        let user = await model.findOne({ email });
        if (user) {
            user.password = password;
            await user.save();
            return user;
        }
        else {
            return null;
        }
    }
    async signin(email, password, ctx) {
        const model = typegoose_1.getModelForClass(User_1.User);
        const user = await model.findOne({ email });
        if (user && await argon.verify(user.password, password) === true) {
            const UserToken = { userId: user.id, nale: user.firstName };
            const token = jwt.sign(UserToken, "secret");
            ctx.res.cookie('appSession', token, { maxAge: 60, httpOnly: true });
            return { token, user };
        }
    }
    async passwordLost(email) {
        const model = typegoose_1.getModelForClass(User_1.User);
        let user = await model.findOne({ email });
        if (user) {
            const provisoryToken = { userId: user.id };
            const provisoryTokenTime = { expiresIn: "15m" };
            const token = jwt.sign(provisoryToken, "secret", provisoryTokenTime);
            user.restoreToken = token;
            user.save();
            console.log('USERSAVE');
            return MailService_1.Mail.mail(user.email, token);
        }
        else {
            return null;
        }
    }
    async restorePassword(token, password, email) {
        const model = typegoose_1.getModelForClass(User_1.User);
        const secret = "secret";
        let user = await model.findOne({ email });
        if (user) {
            const result = await jwt.verify(token, secret);
            if (result && token === user.restoreToken) {
                user.password = await argon.hash(password);
                user.restoreToken = null;
                await user.save();
                console.log(user);
                return { user };
            }
            else {
                return jwt.JsonWebTokenError;
            }
        }
        else {
            return null;
        }
    }
    decodeToken(token) {
        return jwt.verify(token, "secret");
    }
}
__decorate([
    type_graphql_1.Mutation(() => User_1.User),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.User]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "createUser", null);
__decorate([
    type_graphql_1.Mutation(() => User_1.User),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.User]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "createPassword", null);
exports.AuthService = AuthService;
exports.Auth = new AuthService();
