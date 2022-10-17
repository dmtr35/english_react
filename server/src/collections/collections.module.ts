import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { CollectionsController } from './collections.controller'
import { CollectionsService } from './collections.service'
import { FilesModule } from '../files/files.module'

import { Word, WordSchema } from '../words/word.schema'
import { Collection, CollectionSchema } from '../collections/collection.schema'

@Module({
  controllers: [CollectionsController],
  providers: [CollectionsService],
  imports: [
    MongooseModule.forFeature([
      { name: Collection.name, schema: CollectionSchema }
    ]),
    MongooseModule.forFeature([
      { name: Word.name, schema: WordSchema }
    ]),
    FilesModule
  ]
})
export class CollectionsModule {}
