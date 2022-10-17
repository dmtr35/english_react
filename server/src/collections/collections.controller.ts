import { Body, Controller, Post, Get, Delete, Param, UploadedFiles, UseInterceptors, UseGuards } from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'


import { CreateCollectionDto } from './dto/create-collection.dto'
import { CollectionsService } from './collections.service'

@Controller('collections')
export class CollectionsController {

    constructor(private collectionsService: CollectionsService) { }


    @Post('/createCollection/:id')
    @UseInterceptors(FilesInterceptor('dictionary'))
    createCollections(
        @Body() collectionDto: CreateCollectionDto,
        @Param('id') id: string,
        @UploadedFiles() dictionary) {
        // console.log('collectionDto::', collectionDto)
        // console.log('userId::', id)
        // console.log('dictionary::', dictionary)
        return this.collectionsService.createCollections(collectionDto, id, dictionary)
    }

}
