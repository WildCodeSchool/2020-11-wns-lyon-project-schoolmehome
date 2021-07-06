"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const UserService_1 = require("../services/UserService");
const AuthService_1 = require("../services/AuthService");
const LessonService_1 = require("../services/LessonService");
const type_graphql_1 = require("type-graphql");
const User_1 = require("../entities/User");
const AuthResult_1 = require("../entities/AuthResult");
const Lesson_1 = require("../entities/Lesson");
const typegoose_1 = require("@typegoose/typegoose");
let UserResolver = class UserResolver {
    async createUser(data) {
        return await AuthService_1.Auth.createUser(data);
    }
    async firstConnexion(data) {
        return await AuthService_1.Auth.createPassword(data);
    }
    ;
    async authenticatedUser(ctx) {
        //console.log(ctx.user);
        return ctx.user;
    }
    async signin(email, password, ctx) {
        return await AuthService_1.Auth.signin(email, password, ctx);
    }
    async lost(email) {
        return await AuthService_1.Auth.passwordLost(email);
    }
    async resetPassword(token, password, email) {
        return AuthService_1.Auth.restorePassword(token, password, email);
    }
    // @Authorized(['Admin'])
    async getOne(email) {
        return await UserService_1.UserService.findByEmail(email);
    }
    async update(data) {
        return await UserService_1.UserService.updateOne(data);
    }
    // @Authorized(['Admin'])
    async fetchAll() {
        return await UserService_1.UserService.fetchAll();
    }
    async search(name) {
        return await UserService_1.UserService.search(name);
    }
    async delete(id) {
        return await UserService_1.UserService.delete(id);
    }
    async addLesson(data, _id) {
        const model = typegoose_1.getModelForClass(User_1.User);
        const presentation = await model.findById(_id);
        const newLesson = await LessonService_1.lessonService.create(data);
        const newUser = await model.findByIdAndUpdate({ _id }, { lessons: [...presentation.lessons, newLesson] }, { new: true });
        return newUser;
    }
};
__decorate([
    type_graphql_1.Authorized(['Admin']),
    type_graphql_1.Mutation(() => User_1.User),
    __param(0, type_graphql_1.Arg('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.User]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
__decorate([
    type_graphql_1.Mutation(() => User_1.User),
    __param(0, type_graphql_1.Arg('data', () => User_1.User)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.User]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "firstConnexion", null);
__decorate([
    type_graphql_1.Authorized(),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "authenticatedUser", null);
__decorate([
    type_graphql_1.Mutation(() => AuthResult_1.AuthResult, { nullable: true }),
    __param(0, type_graphql_1.Arg('email')), __param(1, type_graphql_1.Arg('password')), __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "signin", null);
__decorate([
    type_graphql_1.Mutation(() => AuthResult_1.AuthResult, { nullable: true }),
    __param(0, type_graphql_1.Arg('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "lost", null);
__decorate([
    type_graphql_1.Mutation(() => AuthResult_1.AuthResult, { nullable: true }),
    __param(0, type_graphql_1.Arg('token')), __param(1, type_graphql_1.Arg('password')), __param(2, type_graphql_1.Arg('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "resetPassword", null);
__decorate([
    type_graphql_1.Query(() => User_1.User),
    __param(0, type_graphql_1.Arg('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getOne", null);
__decorate([
    type_graphql_1.Mutation(() => User_1.User, { nullable: true }),
    __param(0, type_graphql_1.Arg('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.User]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "update", null);
__decorate([
    type_graphql_1.Query(() => [User_1.User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "fetchAll", null);
__decorate([
    type_graphql_1.Query(() => [User_1.User]),
    __param(0, type_graphql_1.Arg('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "search", null);
__decorate([
    type_graphql_1.Mutation(() => [User_1.User]),
    __param(0, type_graphql_1.Arg('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "delete", null);
__decorate([
    type_graphql_1.Mutation(() => User_1.User),
    __param(0, type_graphql_1.Arg('data')), __param(1, type_graphql_1.Arg('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Lesson_1.Lesson, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "addLesson", null);
UserResolver = __decorate([
    type_graphql_1.Resolver(() => User_1.User)
], UserResolver);
exports.UserResolver = UserResolver;
