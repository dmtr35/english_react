import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import mongoose from 'mongoose'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'

import { CreateCollectionDto } from './dto/create-collection.dto'
import { Collection, CollectionDocument } from './collection.schema'
import { Word, WordDocument } from '../words/word.schema'
import { FilesService } from '../files/files.service'

@Injectable()
export class CollectionsService {

    constructor(@InjectModel(Collection.name) private collectionModel: Model<CollectionDocument>,
        @InjectModel(Word.name) private wordModel: Model<WordDocument>,
        private fileService: FilesService
    ) { }
    // private jwtService: JwtService,
    // private userService: UsersService,
    // private mailerService: MailerService,


    async createCollections(collectionDto: CreateCollectionDto, userId: string) {
        try {
            const collections = await this.collectionModel.create({ userId, name: collectionDto.name })
            await this.wordModel.create({ collId: `${collections._id}`, words: collectionDto.filterArrWord })
            return collections
        } catch (e) {
            throw new HttpException('произошла ошибка при записи файла' + e, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async createFromFile(collectionDto: CreateCollectionDto, userId: string, dictionary: any) {
        try {
            const arrWords = JSON.parse(`${collectionDto.filterArrWord}`)
            const fileWords = await this.fileService.createFile(dictionary)
            if (collectionDto.filterArrWord) {
                fileWords.push(...arrWords)
            }
            const collections = await this.collectionModel.create({ userId, name: collectionDto.name })
            await this.wordModel.create({ collId: `${collections._id}`, words: fileWords })
            return collections
        }
        catch (e) {
            throw new HttpException('произошла ошибка при записи файла' + e, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getCollections(userId) {
        try {
            const collections = await this.collectionModel.find({ userId })
            return collections
        } catch (e) {
            throw new HttpException('get collections error' + e, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async updateCollection(collId, collectionDto: CreateCollectionDto) {
        try {
            console.log(collectionDto.name)
            console.log(collId)
            await this.collectionModel.findByIdAndUpdate(collId, { name: collectionDto.name }, { new: true })
            return new UnauthorizedException({ message: 'update completed' })
        } catch (e) {
            throw new HttpException('Collection not rename,  error' + e, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async deleteOneCollection(collId) {
        try {
            // const session = await mongoose.startSession()
            // await session.withTransaction(async () => {
            await this.collectionModel.findByIdAndDelete(collId)
            await this.wordModel.deleteOne({ "collId": collId })
            // await this.collectionModel.findByIdAndDelete(collectionId, { session })
            // await this.wordService.deleteOne({ "collId": collectionId }, { session })
            return new UnauthorizedException({ message: 'collection delete' })
            // })
            // session.commitTransaction()
            // session.endSession()
        } catch (e) {
            throw new HttpException('selected collection not delete, error' + e, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


    async deleteManyCollection(collectionDto: CreateCollectionDto) {
        try {
            await this.collectionModel.deleteMany({ _id: { $in: collectionDto } })
            await this.wordModel.deleteMany({ collId: { $in: collectionDto } })
            return new UnauthorizedException({ message: 'collection delete' })
        } catch (e) {
            throw new HttpException('The transaction was aborted' + e, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
