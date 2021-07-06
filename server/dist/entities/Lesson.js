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
exports.Lesson = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const type_graphql_1 = require("type-graphql");
const Presentation_1 = require("./Presentation");
const Subject_1 = require("./Subject");
let Lesson = class Lesson {
};
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], Lesson.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop(),
    __metadata("design:type", Date)
], Lesson.prototype, "start", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop(),
    __metadata("design:type", Date)
], Lesson.prototype, "end", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop(),
    __metadata("design:type", String)
], Lesson.prototype, "promo", void 0);
__decorate([
    type_graphql_1.Field(() => Subject_1.Subject),
    typegoose_1.prop(),
    __metadata("design:type", Subject_1.Subject)
], Lesson.prototype, "subject", void 0);
__decorate([
    type_graphql_1.Field(() => [Presentation_1.Presentation]),
    typegoose_1.prop(),
    __metadata("design:type", Array)
], Lesson.prototype, "presentation", void 0);
Lesson = __decorate([
    type_graphql_1.ObjectType('LessonType'),
    type_graphql_1.InputType('LessonInput')
], Lesson);
exports.Lesson = Lesson;
