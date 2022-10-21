import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes, Types } from 'mongoose'
import mongoose from 'mongoose'

export type UserDocument = User & Document


@Schema()
export class User {
  _id: mongoose.Types.ObjectId

  @Prop({ unique: true, required: true })
  email: string

  @Prop({ required: true })
  password: string
}

export const UserSchema = SchemaFactory.createForClass(User)



