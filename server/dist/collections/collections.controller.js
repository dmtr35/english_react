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
exports.CollectionsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const create_collection_dto_1 = require("./dto/create-collection.dto");
const collections_service_1 = require("./collections.service");
let CollectionsController = class CollectionsController {
    constructor(collectionsService) {
        this.collectionsService = collectionsService;
    }
    createCollections(collectionDto, id) {
        return this.collectionsService.createCollections(collectionDto, id);
    }
    createFromFile(collectionDto, id, file) {
        return this.collectionsService.createFromFile(collectionDto, id, file);
    }
};
__decorate([
    (0, common_1.Post)('/createCollection/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_collection_dto_1.CreateCollectionDto, String]),
    __metadata("design:returntype", void 0)
], CollectionsController.prototype, "createCollections", null);
__decorate([
    (0, common_1.Post)('/createFromFile/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_collection_dto_1.CreateCollectionDto, String, Object]),
    __metadata("design:returntype", void 0)
], CollectionsController.prototype, "createFromFile", null);
CollectionsController = __decorate([
    (0, common_1.Controller)('collections'),
    __metadata("design:paramtypes", [collections_service_1.CollectionsService])
], CollectionsController);
exports.CollectionsController = CollectionsController;
//# sourceMappingURL=collections.controller.js.map