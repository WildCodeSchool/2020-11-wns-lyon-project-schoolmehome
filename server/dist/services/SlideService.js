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
exports.SlideService = exports.SlideServiceClass = void 0;
const Slide_1 = require("../entities/Slide");
const type_graphql_1 = require("type-graphql");
const typegoose_1 = require("@typegoose/typegoose");
class SlideServiceClass {
    async create(newSlide) {
        const model = typegoose_1.getModelForClass(Slide_1.Slide);
        return await model.create(newSlide);
    }
    async findById(_id) {
        const model = typegoose_1.getModelForClass(Slide_1.Slide);
        return await model.findOne({ _id });
    }
    async delete(_id) {
        const model = typegoose_1.getModelForClass(Slide_1.Slide);
        const deletedSlide = this.findById(_id);
        await model.deleteOne({ _id });
        return deletedSlide;
    }
}
__decorate([
    type_graphql_1.Mutation(() => Slide_1.Slide),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Slide_1.Slide]),
    __metadata("design:returntype", Promise)
], SlideServiceClass.prototype, "create", null);
__decorate([
    type_graphql_1.Query(() => Slide_1.Slide),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SlideServiceClass.prototype, "findById", null);
__decorate([
    type_graphql_1.Mutation(() => Slide_1.Slide),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SlideServiceClass.prototype, "delete", null);
exports.SlideServiceClass = SlideServiceClass;
exports.SlideService = new SlideServiceClass();
