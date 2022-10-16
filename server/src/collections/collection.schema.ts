import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'

import { User } from '../users/user.schema'




export type CollectionDocument = Collection & Document


@Schema()
export class Collection {
  @Prop({ type: String, required: true })
  name: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: () => User })
  userId: mongoose.Schema.Types.ObjectId
}

export const CollectionSchema = SchemaFactory.createForClass(Collection)




