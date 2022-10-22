import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { WordsController } from './words.controller'
import { WordsService } from './words.service'
import { Word, WordSchema } from '../words/word.schema'
import { Collection, CollectionSchema } from '../collections/collection.schema'
import { FilesModule } from '../files/files.module'


@Module({
  controllers: [WordsController],
  providers: [WordsService],
  imports: [
    MongooseModule.forFeature([
      { name: Collection.name, schema: CollectionSchema }
    ]),
    MongooseModule.forFeature([
      { name: Word.name, schema: WordSchema }
    ]),
    FilesModule
  ],
  exports: [
    WordsService
  ]
})
export class WordsModule {}



