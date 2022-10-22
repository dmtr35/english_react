import { UnauthorizedException } from '@nestjs/common';
import mongoose from 'mongoose';
import { Model } from 'mongoose';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { Collection, CollectionDocument } from './collection.schema';
import { WordDocument } from '../words/word.schema';
import { FilesService } from '../files/files.service';
export declare class CollectionsService {
    private collectionModel;
    private wordModel;
    private fileService;
    constructor(collectionModel: Model<CollectionDocument>, wordModel: Model<WordDocument>, fileService: FilesService);
    createCollections(collectionDto: CreateCollectionDto, userId: string): Promise<mongoose.Document<unknown, any, CollectionDocument> & Collection & Document & {
        _id: mongoose.Types.ObjectId;
    }>;
    createFromFile(collectionDto: CreateCollectionDto, userId: string, dictionary: any): Promise<mongoose.Document<unknown, any, CollectionDocument> & Collection & Document & {
        _id: mongoose.Types.ObjectId;
    }>;
    getCollections(userId: any): Promise<(mongoose.Document<unknown, any, CollectionDocument> & Collection & Document & {
        _id: mongoose.Types.ObjectId;
    })[]>;
    updateCollection(collId: any, collectionDto: CreateCollectionDto): Promise<UnauthorizedException>;
    deleteOneCollection(collId: any): Promise<UnauthorizedException>;
    deleteManyCollection(collectionDto: CreateCollectionDto): Promise<UnauthorizedException>;
}
