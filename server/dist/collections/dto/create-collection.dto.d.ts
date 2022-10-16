import * as mongoose from 'mongoose';
export declare class CreateCollectionDto {
    readonly name: string;
    readonly userId: mongoose.Schema.Types.ObjectId;
    readonly _id: mongoose.Schema.Types.ObjectId;
}
