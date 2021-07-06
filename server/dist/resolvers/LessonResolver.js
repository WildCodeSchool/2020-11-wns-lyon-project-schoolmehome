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
exports.LessonResolver = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const type_graphql_1 = require("type-graphql");
const Lesson_1 = require("../entities/Lesson");
const Presentation_1 = require("../entities/Presentation");
const LessonService_1 = require("../services/LessonService");
const PresentationService_1 = require("../services/PresentationService");
let LessonResolver = class LessonResolver {
    async create(data) {
        const model = typegoose_1.getModelForClass(Lesson_1.Lesson);
        return await model.create(data);
    }
    async read(data) {
        const model = typegoose_1.getModelForClass(Lesson_1.Lesson);
        const Lessons = await model.find()
            .populate("promo")
            .populate("lessons")
            .populate("subject");
        return Lessons;
    }
    async findOneLesson(_id) {
        return LessonService_1.lessonService.findOne(_id);
    }
    async addPresentation(data, _id) {
        const model = typegoose_1.getModelForClass(Lesson_1.Lesson);
        const lesson = await model.findById(_id);
        const newPresentation = await PresentationService_1.presentationService.add(data);
        const newLesson = await model.findByIdAndUpdate({ _id }, { presentation: [...lesson.presentation, newPresentation] }, { new: true });
        return newLesson;
    }
};
__decorate([
    __param(0, type_graphql_1.Arg('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Lesson_1.Lesson]),
    __metadata("design:returntype", Promise)
], LessonResolver.prototype, "create", null);
__decorate([
    __param(0, type_graphql_1.Arg('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Lesson_1.Lesson]),
    __metadata("design:returntype", Promise)
], LessonResolver.prototype, "read", null);
__decorate([
    type_graphql_1.Query(() => Lesson_1.Lesson),
    __param(0, type_graphql_1.Arg('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LessonResolver.prototype, "findOneLesson", null);
__decorate([
    type_graphql_1.Mutation(() => Lesson_1.Lesson),
    __param(0, type_graphql_1.Arg('data')), __param(1, type_graphql_1.Arg('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Presentation_1.Presentation, String]),
    __metadata("design:returntype", Promise)
], LessonResolver.prototype, "addPresentation", null);
LessonResolver = __decorate([
    type_graphql_1.Resolver(() => Lesson_1.Lesson)
], LessonResolver);
exports.LessonResolver = LessonResolver;
