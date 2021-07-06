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
exports.Presentation = void 0;
const type_graphql_1 = require("type-graphql");
const typegoose_1 = require("@typegoose/typegoose");
const Slide_1 = require("./Slide");
let Presentation = class Presentation {
};
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], Presentation.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop(),
    __metadata("design:type", String)
], Presentation.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(() => [Slide_1.Slide]),
    typegoose_1.prop(),
    __metadata("design:type", Array)
], Presentation.prototype, "slides", void 0);
Presentation = __decorate([
    type_graphql_1.ObjectType('PresentationType'),
    type_graphql_1.InputType('PresentationInput')
], Presentation);
exports.Presentation = Presentation;
