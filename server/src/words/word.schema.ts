import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import * as mongoose from 'mongoose'

import { Collection } from '../collections/collection.schema'


export type WordDocument = Word & Document
export type listWordsDocument = listWords & Document

@Schema()
export class listWords {
  _id: mongoose.Schema.Types.ObjectId

  @Prop({ type: String, required: true })
  eng: string
  
  @Prop({ type: String, required: true })
  rus: string
}

@Schema()
export class Word {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: () => Collection })
  collId: mongoose.Schema.Types.ObjectId

  @Prop([listWords])
  words: [listWords]
}




export const WordSchema = SchemaFactory.createForClass(Word)
export const listWordsSchema = SchemaFactory.createForClass(listWords)

