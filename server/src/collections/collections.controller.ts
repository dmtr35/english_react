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

    @Post('/createFromFile/:id')
    @UseInterceptors(FileInterceptor('file'))
    createFromFile(
        @Body() collectionDto: CreateCollectionDto,
        @Param('id') id: string,
        @UploadedFile() file
    ) {
        return this.collectionsService.createFromFile(collectionDto, id, file)
    }

    @Get('/getCollections/:userId')
    getCollections(
        @Param('userId') userId: string,
    ) {
        return this.collectionsService.getCollections(userId)
    }

    @Post('/updateCollection/:collId')
    updateCollection(
        @Param('collId') collId: string,
        @Body() collectionDto: CreateCollectionDto
    ) {
        return this.collectionsService.updateCollection(collId, collectionDto)
    }

    @Delete('/deleteOneCollection/:collId')
    deleteOneCollection(
        @Param('collId') collId: string,
    ) {
        return this.collectionsService.deleteOneCollection(collId)
    }

    @Post('/deleteManyCollection/')
    deleteManyCollection(
        @Body() collectionDto: CreateCollectionDto,
    ) {
        console.log(collectionDto)
        return this.collectionsService.deleteManyCollection(collectionDto)
    }


}