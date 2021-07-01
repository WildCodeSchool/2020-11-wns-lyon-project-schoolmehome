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
exports.presentationService = exports.PresentationServiceClass = void 0;
const Presentation_1 = require("../entities/Presentation");
const type_graphql_1 = require("type-graphql");
const typegoose_1 = require("@typegoose/typegoose");
class PresentationServiceClass {
    // @Mutation(() => Slide)
    // public async create (newSlide:Slide): Promise<Slide> {   
    //     const model = getModelForClass(Slide);
    //     return await model.create(newSlide);    
    // }
    async add(newPres) {
        const model = typegoose_1.getModelForClass(Presentation_1.Presentation);
        return model.create(newPres);
    }
    async findById(_id) {
        const model = typegoose_1.getModelForClass(Presentation_1.Presentation);
        return await model.findOne({ _id });
    }
    async findAll() {
        const model = typegoose_1.getModelForClass(Presentation_1.Presentation);
        return await model.find({});
    }
    async delete(_id) {
        const model = typegoose_1.getModelForClass(Presentation_1.Presentation);
        const deletedPresentation = this.findById(_id);
        await model.deleteOne({ _id });
        return deletedPresentation;
    }
    async update(data) {
        const model = typegoose_1.getModelForClass(Presentation_1.Presentation);
        const update = model.findByIdAndUpdate({ _id: data._id }, { $set: data }, { new: true });
        return update;
    }
}
__decorate([
    type_graphql_1.Mutation(() => Presentation_1.Presentation),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Presentation_1.Presentation]),
    __metadata("design:returntype", Promise)
], PresentationServiceClass.prototype, "add", null);
__decorate([
    type_graphql_1.Query(() => Presentation_1.Presentation),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PresentationServiceClass.prototype, "findById", null);
__decorate([
    type_graphql_1.Query(() => [Presentation_1.Presentation]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PresentationServiceClass.prototype, "findAll", null);
__decorate([
    type_graphql_1.Mutation(() => Presentation_1.Presentation),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PresentationServiceClass.prototype, "delete", null);
__decorate([
    type_graphql_1.Mutation(() => Presentation_1.Presentation),
    __param(0, type_graphql_1.Arg('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Presentation_1.Presentation]),
    __metadata("design:returntype", Promise)
], PresentationServiceClass.prototype, "update", null);
exports.PresentationServiceClass = PresentationServiceClass;
exports.presentationService = new PresentationServiceClass();
