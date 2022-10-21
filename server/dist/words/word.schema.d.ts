import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
export declare type WordDocument = Word & Document;
export declare type listWordsDocument = listWords & Document;
export declare class listWords {
    _id: mongoose.Schema.Types.ObjectId;
    eng: string;
    rus: string;
}
export declare class Word {
    collId: mongoose.Schema.Types.ObjectId;
    words: [listWords];
}
export declare const WordSchema: mongoose.Schema<Word, mongoose.Model<Word, any, any, any, any>, {}, {}, {}, {}, "type", Word>;
export declare const listWordsSchema: mongoose.Schema<listWords, mongoose.Model<listWords, any, any, any, any>, {}, {}, {}, {}, "type", listWords>;
