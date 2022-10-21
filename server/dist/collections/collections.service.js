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
exports.CollectionsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const collection_schema_1 = require("./collection.schema");
const word_schema_1 = require("../words/word.schema");
const files_service_1 = require("../files/files.service");
let CollectionsService = class CollectionsService {
    constructor(collectionModel, wordService, fileService) {
        this.collectionModel = collectionModel;
        this.wordService = wordService;
        this.fileService = fileService;
    }
    async createCollections(collectionDto, userId) {
        try {
            const collections = await this.collectionModel.create({ userId, name: collectionDto.name });
            await this.wordService.create({ collId: `${collections._id}`, words: collectionDto.filterArrWord });
            return collections;
        }
        catch (e) {
            throw new common_1.HttpException('произошла ошибка при записи файла' + e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createFromFile(collectionDto, userId, dictionary) {
        try {
            const arrWords = JSON.parse(`${collectionDto.filterArrWord}`);
            const fileWords = await this.fileService.createFile(dictionary);
            if (collectionDto.filterArrWord) {
                fileWords.push(...arrWords);
            }
            const collections = await this.collectionModel.create({ userId, name: collectionDto.name });
            await this.wordService.create({ collId: `${collections._id}`, words: fileWords });
            return collections;
        }
        catch (e) {
            throw new common_1.HttpException('произошла ошибка при записи файла' + e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
CollectionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(collection_schema_1.Collection.name)),
    __param(1, (0, mongoose_2.InjectModel)(word_schema_1.Word.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        files_service_1.FilesService])
], CollectionsService);
exports.CollectionsService = CollectionsService;
//# sourceMappingURL=collections.service.js.map