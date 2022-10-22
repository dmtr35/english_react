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
exports.WordsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const words_service_1 = require("./words.service");
const create_word_dto_1 = require("./dto/create-word.dto");
let WordsController = class WordsController {
    constructor(wordsService) {
        this.wordsService = wordsService;
    }
    addWorlds(wordDto, id) {
        return this.wordsService.addWorlds(wordDto, id);
    }
    addWordsFromFile(wordDto, id, file) {
        return this.wordsService.addWordsFromFile(wordDto, id, file);
    }
    getWords(collId) {
        return this.wordsService.getWords(collId);
    }
    updateWord(wordId, wordDto) {
        console.log('wordDto::', wordDto);
        return this.wordsService.updateWord(wordId, wordDto);
    }
    deleteOneWord(collId, wordDto) {
        return this.wordsService.deleteOneWord(wordDto, collId);
    }
    deleteAndMove(transferWord, wordDto) {
        return this.wordsService.deleteAndMove(transferWord, wordDto);
    }
};
__decorate([
    (0, common_1.Post)('/addWords/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_word_dto_1.CreateWordDto, String]),
    __metadata("design:returntype", void 0)
], WordsController.prototype, "addWorlds", null);
__decorate([
    (0, common_1.Post)('/addWordsFromFile/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_word_dto_1.CreateWordDto, String, Object]),
    __metadata("design:returntype", void 0)
], WordsController.prototype, "addWordsFromFile", null);
__decorate([
    (0, common_1.Post)('/getWords/'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], WordsController.prototype, "getWords", null);
__decorate([
    (0, common_1.Post)('/updateWords/:wordId'),
    __param(0, (0, common_1.Param)('wordId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_word_dto_1.CreateWordDto]),
    __metadata("design:returntype", void 0)
], WordsController.prototype, "updateWord", null);
__decorate([
    (0, common_1.Post)('/deleteOneWord/:collId'),
    __param(0, (0, common_1.Param)('collId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_word_dto_1.CreateWordDto]),
    __metadata("design:returntype", void 0)
], WordsController.prototype, "deleteOneWord", null);
__decorate([
    (0, common_1.Post)('/deleteAndMove/:transferWord'),
    __param(0, (0, common_1.Param)('transferWord')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_word_dto_1.CreateWordDto]),
    __metadata("design:returntype", void 0)
], WordsController.prototype, "deleteAndMove", null);
WordsController = __decorate([
    (0, common_1.Controller)('words'),
    __metadata("design:paramtypes", [words_service_1.WordsService])
], WordsController);
exports.WordsController = WordsController;
//# sourceMappingURL=words.controller.js.map