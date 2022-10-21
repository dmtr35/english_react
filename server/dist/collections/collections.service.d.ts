import mongoose from 'mongoose';
import { Model } from 'mongoose';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { Collection, CollectionDocument } from './collection.schema';
import { WordDocument } from '../words/word.schema';
import { FilesService } from '../files/files.service';
export declare class CollectionsService {
    private collectionModel;
    private wordService;
    private fileService;
    constructor(collectionModel: Model<CollectionDocument>, wordService: Model<WordDocument>, fileService: FilesService);
    createCollections(collectionDto: CreateCollectionDto, userId: string): Promise<mongoose.Document<unknown, any, CollectionDocument> & Collection & Document & {
        _id: mongoose.Types.ObjectId;
    }>;
    createFromFile(collectionDto: CreateCollectionDto, userId: string, dictionary: any): Promise<mongoose.Document<unknown, any, CollectionDocument> & Collection & Document & {
        _id: mongoose.Types.ObjectId;
    }>;
}
