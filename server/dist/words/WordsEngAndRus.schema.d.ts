import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
export declare type WordDocument = Word & Document;
export declare class Word {
    collectionId: mongoose.Schema.Types.ObjectId;
    words: [WordsEngAndRus];
}
export declare const WordSchema: mongoose.Schema<Word, mongoose.Model<Word, any, any, any, any>, {}, {}, {}, {}, "type", Word>;
export declare type WordsEngAndRusDocument = WordsEngAndRus & Document;
export declare class WordsEngAndRus {
    eng: number;
    rus: mongoose.Schema.Types.ObjectId;
    p_id: mongoose.Schema.Types.ObjectId;
}
export declare const WordsEngAndRusSchema: mongoose.Schema<WordsEngAndRus, mongoose.Model<WordsEngAndRus, any, any, any, any>, {}, {}, {}, {}, "type", WordsEngAndRus>;
