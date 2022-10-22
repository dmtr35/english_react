"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const words_controller_1 = require("./words.controller");
const words_service_1 = require("./words.service");
const word_schema_1 = require("../words/word.schema");
const collection_schema_1 = require("../collections/collection.schema");
const files_module_1 = require("../files/files.module");
let WordsModule = class WordsModule {
};
WordsModule = __decorate([
    (0, common_1.Module)({
        controllers: [words_controller_1.WordsController],
        providers: [words_service_1.WordsService],
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: collection_schema_1.Collection.name, schema: collection_schema_1.CollectionSchema }
            ]),
            mongoose_1.MongooseModule.forFeature([
                { name: word_schema_1.Word.name, schema: word_schema_1.WordSchema }
            ]),
            files_module_1.FilesModule
        ],
        exports: [
            words_service_1.WordsService
        ]
    })
], WordsModule);
exports.WordsModule = WordsModule;
//# sourceMappingURL=words.module.js.map