import * as mongoose from 'mongoose'




export class CreateCollectionDto {
    readonly name: string
    readonly userId: mongoose.Schema.Types.ObjectId
    readonly _id: mongoose.Schema.Types.ObjectId
}

