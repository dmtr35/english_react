import * as mongoose from 'mongoose'
import { listWords } from '../../words/dto/create-word.dto'




export class CreateCollectionDto {
    readonly name: string
    readonly userId: mongoose.Schema.Types.ObjectId

    readonly dictionary: any
    readonly filterArrWord: listWords
}
