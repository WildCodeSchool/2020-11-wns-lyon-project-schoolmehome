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
exports.SlideResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Slide_1 = require("../entities/Slide");
const SlideService_1 = require("../services/SlideService");
let SlideResolver = class SlideResolver {
    async createSlide(data) {
        return SlideService_1.SlideService.create(data);
    }
    async deleteSlide(_id) {
        return SlideService_1.SlideService.delete(_id);
    }
    async findOne(_id) {
        return SlideService_1.SlideService.findById(_id);
    }
};
__decorate([
    type_graphql_1.Mutation(() => Slide_1.Slide),
    __param(0, type_graphql_1.Arg('data', () => Slide_1.Slide)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Slide_1.Slide]),
    __metadata("design:returntype", Promise)
], SlideResolver.prototype, "createSlide", null);
__decorate([
    type_graphql_1.Mutation(() => Slide_1.Slide),
    __param(0, type_graphql_1.Arg('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SlideResolver.prototype, "deleteSlide", null);
__decorate([
    type_graphql_1.Query(() => Slide_1.Slide),
    __param(0, type_graphql_1.Arg('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SlideResolver.prototype, "findOne", null);
SlideResolver = __decorate([
    type_graphql_1.Resolver(() => Slide_1.Slide)
], SlideResolver);
exports.SlideResolver = SlideResolver;
