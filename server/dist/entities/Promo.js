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
exports.Promo = void 0;
const Subject_1 = require("./Subject");
const User_1 = require("./User");
const type_graphql_1 = require("type-graphql");
const typegoose_1 = require("@typegoose/typegoose");
let Promo = class Promo {
};
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop(),
    __metadata("design:type", String)
], Promo.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(() => [User_1.User]),
    typegoose_1.prop(),
    __metadata("design:type", Array)
], Promo.prototype, "students", void 0);
__decorate([
    type_graphql_1.Field(() => [Subject_1.Subject]),
    typegoose_1.prop(),
    __metadata("design:type", Array)
], Promo.prototype, "subject", void 0);
Promo = __decorate([
    type_graphql_1.ObjectType('PromoType'),
    type_graphql_1.InputType('PromoInput')
], Promo);
exports.Promo = Promo;
