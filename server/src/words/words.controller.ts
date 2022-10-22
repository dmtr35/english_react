import { Body, Controller, Post, Get, Delete, Param, UploadedFile, UploadedFiles, UseInterceptors, UseGuards } from '@nestjs/common'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'

import { WordsService } from './words.service'
import { CreateWordDto } from './dto/create-word.dto'


@Controller('words')
export class WordsController {

    constructor(private wordsService: WordsService) { }

    @Post('/addWords/:id')
    addWorlds(
        @Body() wordDto: CreateWordDto,
        @Param('id') id: string) {
        return this.wordsService.addWorlds(wordDto, id)
    }

    @Post('/addWordsFromFile/:id')
    @UseInterceptors(FileInterceptor('file'))
    addWordsFromFile(
        @Body() wordDto: CreateWordDto,
        @Param('id') id: string,
        @UploadedFile() file
    ) {
        return this.wordsService.addWordsFromFile(wordDto, id, file)
    }

    @Post('/getWords/')
    getWords(
        @Body() collId: Array<String>,
    ) {
        return this.wordsService.getWords(collId)
    }

    @Post('/updateWords/:wordId')
    updateWord(
        @Param('wordId') wordId: string,
        @Body() wordDto: CreateWordDto
    ) {
        console.log('wordDto::', wordDto)
        return this.wordsService.updateWord(wordId, wordDto)
    }

    @Post('/deleteOneWord/:collId')
    deleteOneWord(
        @Param('collId') collId: string,
        @Body() wordDto: CreateWordDto
    ) {
        return this.wordsService.deleteOneWord(wordDto, collId)
    }

    @Post('/deleteAndMove/:transferWord')
    deleteAndMove(
        @Param('transferWord') transferWord: string,
        @Body() wordDto: CreateWordDto
    ) {
        return this.wordsService.deleteAndMove(transferWord, wordDto)
    }

}

