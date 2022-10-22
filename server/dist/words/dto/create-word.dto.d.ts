import * as mongoose from 'mongoose';
export declare class CreateWordDto {
    readonly collId: mongoose.Schema.Types.ObjectId;
    readonly words: listWords[];
    readonly dictionary: any;
    readonly filterArrWord: listWords;
}
export declare class listWords {
    readonly eng: string;
    readonly rus: string;
    readonly _id: mongoose.Schema.Types.ObjectId;
}
