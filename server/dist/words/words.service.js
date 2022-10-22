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
exports.WordsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const word_schema_1 = require("../words/word.schema");
const files_service_1 = require("../files/files.service");
let WordsService = class WordsService {
    constructor(wordModel, fileService) {
        this.wordModel = wordModel;
        this.fileService = fileService;
    }
    async addWorlds(wordDto, collId) {
        try {
            await this.wordModel.create({ collId, words: wordDto.filterArrWord });
            return new common_1.UnauthorizedException({ message: 'dictionary created' });
        }
        catch (e) {
            throw new common_1.HttpException('произошла ошибка при записи файла' + e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async addWordsFromFile(wordDto, collId, dictionary) {
        try {
            const arrWords = JSON.parse(`${wordDto.filterArrWord}`);
            const fileWords = await this.fileService.createFile(dictionary);
            if (wordDto.filterArrWord) {
                fileWords.push(...arrWords);
            }
            await this.wordModel.create({ collId, words: fileWords });
            return new common_1.UnauthorizedException({ message: 'dictionary created' });
        }
        catch (e) {
            throw new common_1.HttpException('произошла ошибка при записи файла' + e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getWords(collId) {
        try {
            const words = await this.wordModel.find({ collId });
            return words;
        }
        catch (e) {
            throw new common_1.HttpException('get words error' + e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateWord(wordId, wordDto) {
        try {
            await this.wordModel.findOneAndUpdate({ "words._id": wordId }, { "$set": { "words.$": wordDto } }, { new: true });
            return new common_1.UnauthorizedException({ message: 'Word update completed' });
        }
        catch (e) {
            throw new common_1.HttpException('Collection not rename,  error' + e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteOneWord(wordDto, collId) {
        try {
            const response = await this.wordModel.updateOne({ collId }, { "$pull": { "words": { "_id": wordDto.wordId } } });
            return response;
        }
        catch (e) {
            throw new common_1.HttpException('Word not delete, error' + e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteAndMove(transferWord, wordDto) {
        try {
            await this.wordModel.updateOne({ "collId": wordDto.currentCollId }, { "$pull": { "words": { "_id": wordDto.wordId } } });
            await this.wordModel.updateOne({ "collId": transferWord }, { "$push": { "words": { "$each": wordDto.arrWord } } });
            return new common_1.UnauthorizedException({ message: 'word moved' });
        }
        catch (e) {
            throw new common_1.HttpException('happened somewhere error:' + e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
WordsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(word_schema_1.Word.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        files_service_1.FilesService])
], WordsService);
exports.WordsService = WordsService;
//# sourceMappingURL=words.service.js.map