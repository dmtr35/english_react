import { Body, Controller, Post, Get, Delete, Param, UploadedFile, UploadedFiles, UseInterceptors, UseGuards } from '@nestjs/common'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'


import { CreateCollectionDto } from './dto/create-collection.dto'
import { CollectionsService } from './collections.service'

@Controller('collections')
export class CollectionsController {

    constructor(private collectionsService: CollectionsService) { }


    @Post('/createCollection/:id')
    createCollections(
        @Body() collectionDto: CreateCollectionDto,
        @Param('id') id: string) {
        return this.collectionsService.createCollections(collectionDto, id)
    }

    // @Post('/createFromFile/:id')
    // @UseInterceptors(FileInterceptor('dictionary'))
    // createFromFile(
    //     @Body() collectionDto: CreateCollectionDto,
    //     @Param('id') id: string,
    //     @UploadedFile() dictionary: any
    //     ) {
    //     console.log('collectionDto:1:', collectionDto)
    //     console.log('userId:1:', id)
    //     console.log('dictionary:1:', dictionary)
    //     return this.collectionsService.createFromFile(collectionDto, id)
    // }

    @Post('/createFromFile/:id')
    @UseInterceptors(FileInterceptor('file'))
    createFromFile(
        @Body() collectionDto: CreateCollectionDto,
        @Param('id') id: string,
        @UploadedFile() file
    ) {
        // console.log('collectionDto:1:', collectionDto)
        // console.log('userId:1:', id)
        // console.log('file:1:', file)
        return this.collectionsService.createFromFile(collectionDto, id, file)
    }

}