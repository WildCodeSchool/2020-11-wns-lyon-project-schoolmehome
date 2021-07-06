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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUpdate = exports.User = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const class_validator_1 = require("class-validator");
const type_graphql_1 = require("type-graphql");
const Lesson_1 = require("./Lesson");
const Subject_1 = require("./Subject");
const Promo_1 = require("./Promo");
let User = class User {
};
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typegoose_1.prop(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typegoose_1.prop(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    type_graphql_1.Field(),
    class_validator_1.IsEmail(),
    class_validator_1.Length(3, 100),
    typegoose_1.prop(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true })
    // @Length(8, 50)
    ,
    typegoose_1.prop(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typegoose_1.prop(),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typegoose_1.prop(),
    __metadata("design:type", String)
], User.prototype, "birthdate", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typegoose_1.prop(),
    __metadata("design:type", String)
], User.prototype, "street", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typegoose_1.prop(),
    __metadata("design:type", String)
], User.prototype, "zipcode", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typegoose_1.prop(),
    __metadata("design:type", String)
], User.prototype, "city", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop(),
    class_validator_1.IsIn(['Admin', 'User', 'Teacher']),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    type_graphql_1.Field(() => [Lesson_1.Lesson], { nullable: true }),
    typegoose_1.prop(),
    __metadata("design:type", Array)
], User.prototype, "lessons", void 0);
__decorate([
    type_graphql_1.Field(() => [Subject_1.Subject], { nullable: true }),
    typegoose_1.prop(),
    __metadata("design:type", Array)
], User.prototype, "subject", void 0);
__decorate([
    type_graphql_1.Field(() => [Promo_1.Promo], { nullable: true }),
    typegoose_1.prop(),
    __metadata("design:type", Array)
], User.prototype, "promo", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typegoose_1.prop(),
    __metadata("design:type", String)
], User.prototype, "restoreToken", void 0);
User = __decorate([
    type_graphql_1.ObjectType('UserType'),
    type_graphql_1.InputType('UserInput')
], User);
exports.User = User;
let UserUpdate = class UserUpdate {
};
__decorate([
    type_graphql_1.Field({ nullable: true }),
    class_validator_1.Length(2, 20),
    typegoose_1.prop(),
    __metadata("design:type", String)
], UserUpdate.prototype, "firstName", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    class_validator_1.Length(3, 20),
    typegoose_1.prop(),
    __metadata("design:type", String)
], UserUpdate.prototype, "lastName", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    class_validator_1.IsEmail(),
    class_validator_1.Length(3, 100),
    typegoose_1.prop(),
    __metadata("design:type", String)
], UserUpdate.prototype, "email", void 0);
UserUpdate = __decorate([
    type_graphql_1.ObjectType('UserUpdate'),
    type_graphql_1.InputType('UserUpdate')
], UserUpdate);
exports.UserUpdate = UserUpdate;
typegoose_1.mongoose.set('useFindAndModify', false);
