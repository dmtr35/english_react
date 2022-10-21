import * as mongoose from 'mongoose';
export declare class CreateWordDto {
    readonly collId: mongoose.Schema.Types.ObjectId;
    readonly words: listWords[];
}
export declare class listWords {
    readonly eng: string;
    readonly rus: string;
}
