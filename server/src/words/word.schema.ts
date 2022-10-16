import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import * as mongoose from 'mongoose'

import { Collection } from '../collections/collection.schema'


export type WordDocument = Word & Document
export type WordsEngAndRusDocument = WordsEngAndRus & Document

@Schema()
export class WordsEngAndRus {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id: mongoose.Schema.Types.ObjectId

  @Prop({ type: String, required: true })
  eng: number
  
  @Prop({ type: String, required: true })
  rus: mongoose.Schema.Types.ObjectId
}

@Schema()
export class Word {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: () => Collection })
  collectionId: mongoose.Schema.Types.ObjectId

  @Prop([WordsEngAndRus])
  words: [WordsEngAndRus]
}




export const WordSchema = SchemaFactory.createForClass(Word)
export const WordsEngAndRusSchema = SchemaFactory.createForClass(WordsEngAndRus)

