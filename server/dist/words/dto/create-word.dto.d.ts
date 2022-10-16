import * as mongoose from 'mongoose';
export declare class CreateWordDto {
    readonly collectionId: mongoose.Schema.Types.ObjectId;
    readonly words: WordsEngAndRus[];
    readonly _id: mongoose.Schema.Types.ObjectId;
}
export declare class WordsEngAndRus {
    readonly eng: string;
    readonly rus: string;
    readonly _id: mongoose.Schema.Types.ObjectId;
}
