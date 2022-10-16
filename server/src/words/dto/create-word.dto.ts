import * as mongoose from 'mongoose'




export class CreateWordDto {
    readonly collectionId: mongoose.Schema.Types.ObjectId
    readonly words: WordsEngAndRus[]
    readonly _id: mongoose.Schema.Types.ObjectId
}



export class WordsEngAndRus {
    readonly eng: string
    readonly rus: string
    readonly _id: mongoose.Schema.Types.ObjectId
}



