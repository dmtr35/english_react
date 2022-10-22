import { UnauthorizedException } from '@nestjs/common';
import mongoose from 'mongoose';
import { Model } from 'mongoose';
import { CreateWordDto } from './dto/create-word.dto';
import { Word, WordDocument } from '../words/word.schema';
import { FilesService } from '../files/files.service';
export declare class WordsService {
    private wordModel;
    private fileService;
    constructor(wordModel: Model<WordDocument>, fileService: FilesService);
    addWorlds(wordDto: CreateWordDto, collId: string): Promise<UnauthorizedException>;
    addWordsFromFile(wordDto: CreateWordDto, collId: string, dictionary: any): Promise<UnauthorizedException>;
    getWords(collId: Array<String>): Promise<(Word & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    })[]>;
    updateWord(wordId: string, wordDto: CreateWordDto): Promise<UnauthorizedException>;
    deleteOneWord(wordDto: any, collId: any): Promise<import("mongodb").UpdateResult>;
    deleteAndMove(transferWord: any, wordDto: any): Promise<UnauthorizedException>;
}
