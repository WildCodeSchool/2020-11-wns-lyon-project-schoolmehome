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
exports.UserService = exports.UserServiceClass = void 0;
const User_1 = require("../entities/User");
const type_graphql_1 = require("type-graphql");
const typegoose_1 = require("@typegoose/typegoose");
class UserServiceClass {
    async findByEmail(email) {
        const model = typegoose_1.getModelForClass(User_1.User);
        return await model.findOne({ email });
    }
    async updateOne(data) {
        const model = typegoose_1.getModelForClass(User_1.User);
        return await model.findByIdAndUpdate({ _id: data._id }, { $set: data }, { new: true });
    }
    async fetchAll() {
        const model = typegoose_1.getModelForClass(User_1.User);
        return model.find();
    }
    async search(name) {
        const model = typegoose_1.getModelForClass(User_1.User);
        if (name.length > 1) {
            return (await model.find()).filter(user => {
                return user.lastName.toUpperCase().includes(name.toUpperCase()) || user.firstName.toUpperCase().includes(name.toUpperCase());
            });
        }
        else {
            return model.find();
        }
    }
    async delete(id) {
        const model = typegoose_1.getModelForClass(User_1.User);
        const user = await model.findByIdAndRemove({ _id: id });
        return model.find();
    }
}
__decorate([
    type_graphql_1.Query(() => User_1.User),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserServiceClass.prototype, "findByEmail", null);
__decorate([
    type_graphql_1.Mutation(() => User_1.User, { nullable: true }),
    __param(0, type_graphql_1.Arg('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.User]),
    __metadata("design:returntype", Promise)
], UserServiceClass.prototype, "updateOne", null);
__decorate([
    type_graphql_1.Query(() => [User_1.User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserServiceClass.prototype, "fetchAll", null);
__decorate([
    type_graphql_1.Query(() => [User_1.User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserServiceClass.prototype, "search", null);
__decorate([
    type_graphql_1.Mutation(() => [User_1.User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserServiceClass.prototype, "delete", null);
exports.UserServiceClass = UserServiceClass;
exports.UserService = new UserServiceClass();
