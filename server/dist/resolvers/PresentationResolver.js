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
exports.PresentationResolver = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const type_graphql_1 = require("type-graphql");
const Slide_1 = require("../entities/Slide");
const Presentation_1 = require("../entities/Presentation");
const SlideService_1 = require("../services/SlideService");
const PresentationService_1 = require("../services/PresentationService");
let PresentationResolver = class PresentationResolver {
    async createPresentation(data) {
        const model = typegoose_1.getModelForClass(Presentation_1.Presentation);
        return await model.create(data);
    }
    async findOnePresentation(_id) {
        return await PresentationService_1.presentationService.findById(_id);
    }
    async findAllPresentation() {
        return await PresentationService_1.presentationService.findAll();
    }
    async deletePresentation(_id) {
        return PresentationService_1.presentationService.delete(_id);
    }
    async addSlide(data, _id) {
        const model = typegoose_1.getModelForClass(Presentation_1.Presentation);
        const presentation = await model.findById(_id);
        data.order = presentation.slides.length;
        const newSlide = await SlideService_1.SlideService.create(data);
        const newPresentation = await model.findByIdAndUpdate({ _id }, { slides: [...presentation.slides, newSlide] }, { new: true });
        return newPresentation;
    }
    async updatePresentation(data) {
        return await PresentationService_1.presentationService.update(data);
    }
};
__decorate([
    type_graphql_1.Mutation(() => Presentation_1.Presentation),
    __param(0, type_graphql_1.Arg('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Presentation_1.Presentation]),
    __metadata("design:returntype", Promise)
], PresentationResolver.prototype, "createPresentation", null);
__decorate([
    type_graphql_1.Query(() => Presentation_1.Presentation),
    __param(0, type_graphql_1.Arg('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PresentationResolver.prototype, "findOnePresentation", null);
__decorate([
    type_graphql_1.Query(() => [Presentation_1.Presentation]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PresentationResolver.prototype, "findAllPresentation", null);
__decorate([
    type_graphql_1.Mutation(() => Presentation_1.Presentation),
    __param(0, type_graphql_1.Arg('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PresentationResolver.prototype, "deletePresentation", null);
__decorate([
    type_graphql_1.Mutation(() => Presentation_1.Presentation),
    __param(0, type_graphql_1.Arg('data')), __param(1, type_graphql_1.Arg('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Slide_1.Slide, String]),
    __metadata("design:returntype", Promise)
], PresentationResolver.prototype, "addSlide", null);
__decorate([
    type_graphql_1.Mutation(() => Presentation_1.Presentation),
    __param(0, type_graphql_1.Arg('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Presentation_1.Presentation]),
    __metadata("design:returntype", Promise)
], PresentationResolver.prototype, "updatePresentation", null);
PresentationResolver = __decorate([
    type_graphql_1.Resolver(() => Presentation_1.Presentation)
], PresentationResolver);
exports.PresentationResolver = PresentationResolver;
