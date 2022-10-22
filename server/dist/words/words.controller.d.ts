import { WordsService } from './words.service';
import { CreateWordDto } from './dto/create-word.dto';
export declare class WordsController {
    private wordsService;
    constructor(wordsService: WordsService);
    addWorlds(wordDto: CreateWordDto, id: string): Promise<import("@nestjs/common").UnauthorizedException>;
    addWordsFromFile(wordDto: CreateWordDto, id: string, file: any): Promise<import("@nestjs/common").UnauthorizedException>;
    getWords(collId: Array<String>): Promise<(import("./word.schema").Word & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    updateWord(wordId: string, wordDto: CreateWordDto): Promise<import("@nestjs/common").UnauthorizedException>;
    deleteOneWord(collId: string, wordDto: CreateWordDto): Promise<import("mongodb").UpdateResult>;
    deleteAndMove(transferWord: string, wordDto: CreateWordDto): Promise<import("@nestjs/common").UnauthorizedException>;
}
