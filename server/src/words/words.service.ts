import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import mongoose from 'mongoose'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'

import { CreateWordDto } from './dto/create-word.dto'
import { Word, WordDocument } from '../words/word.schema'
import { FilesService } from '../files/files.service'
@Injectable()
export class WordsService {
    constructor(@InjectModel(Word.name) private wordModel: Model<WordDocument>,
        private fileService: FilesService
    ) { }
    // private jwtService: JwtService,
    // private userService: UsersService,
    // private mailerService: MailerService,


    async addWorlds(wordDto: CreateWordDto, collId: string) {
        try {
            await this.wordModel.create({ collId, words: wordDto.filterArrWord })
            return new UnauthorizedException({ message: 'dictionary created' })
        } catch (e) {
            throw new HttpException('произошла ошибка при записи файла' + e, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async addWordsFromFile(wordDto: CreateWordDto, collId: string, dictionary: any) {
        try {
            const arrWords = JSON.parse(`${wordDto.filterArrWord}`)
            const fileWords = await this.fileService.createFile(dictionary)
            if (wordDto.filterArrWord) {
                fileWords.push(...arrWords)
            }
            await this.wordModel.create({ collId, words: fileWords })
            return new UnauthorizedException({ message: 'dictionary created' })
        }
        catch (e) {
            throw new HttpException('произошла ошибка при записи файла' + e, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


    async getWords(collId: Array<String>) {
        try {
            const words = await this.wordModel.find({ collId })
            return words
        } catch (e) {
            throw new HttpException('get words error' + e, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async updateWord(wordId: string, wordDto: CreateWordDto) {
        try {
            await this.wordModel.findOneAndUpdate({ "words._id": wordId }, { "$set": { "words.$": wordDto } }, { new: true })
            return new UnauthorizedException({ message: 'Word update completed' })
        } catch (e) {
            throw new HttpException('Collection not rename,  error' + e, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async deleteOneWord(wordDto, collId) {
        try {
            const response = await this.wordModel.updateOne({ collId }, { "$pull": { "words": { "_id": wordDto.wordId } } })
            return response
        } catch (e) {
            throw new HttpException('Word not delete, error' + e, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async deleteAndMove(transferWord, wordDto) {
        try {
            await this.wordModel.updateOne({ "collId": wordDto.currentCollId }, { "$pull": { "words": { "_id": wordDto.wordId } } })
            await this.wordModel.updateOne({ "collId": transferWord }, { "$push": { "words": { "$each": wordDto.arrWord } } })
            return new UnauthorizedException({ message: 'word moved' })
        } catch (e) {
            throw new HttpException('happened somewhere error:' + e, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }



}
