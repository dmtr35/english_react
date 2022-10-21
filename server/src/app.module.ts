import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import * as path from 'path'

import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { CollectionsModule } from './collections/collections.module'
import { WordsModule } from './words/words.module'
import { FilesModule } from './files/files.module'





@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    // ServeStaticModule.forRoot({
    //   rootPath: path.resolve(__dirname, 'static'),
    // }),
    MongooseModule.forRoot(process.env.MONGODB_HOST),

    
    UsersModule,
    AuthModule,
    CollectionsModule,
    WordsModule,
    FilesModule
  ],
})
export class AppModule { }
