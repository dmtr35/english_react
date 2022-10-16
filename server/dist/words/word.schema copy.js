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
exports.WordsEngAndRusSchema = exports.WordsEngAndRus = exports.WordSchema = exports.Word = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const collection_schema_1 = require("../collections/collection.schema");
let Word = class Word {
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: () => collection_schema_1.Collection }),
    __metadata("design:type", mongoose.Schema.Types.ObjectId)
], Word.prototype, "collectionId", void 0);
__decorate([
    (0, mongoose_1.Prop)([WordsEngAndRus]),
    __metadata("design:type", Array)
], Word.prototype, "words", void 0);
Word = __decorate([
    (0, mongoose_1.Schema)()
], Word);
exports.Word = Word;
exports.WordSchema = mongoose_1.SchemaFactory.createForClass(Word);
class WordsEngAndRus {
}
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", Number)
], WordsEngAndRus.prototype, "eng", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", mongoose.Schema.Types.ObjectId)
], WordsEngAndRus.prototype, "rus", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId }),
    __metadata("design:type", mongoose.Schema.Types.ObjectId)
], WordsEngAndRus.prototype, "p_id", void 0);
exports.WordsEngAndRus = WordsEngAndRus;
exports.WordsEngAndRusSchema = mongoose_1.SchemaFactory.createForClass(WordsEngAndRus);
//# sourceMappingURL=word.schema%20copy.js.map