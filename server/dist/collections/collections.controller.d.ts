/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { CreateCollectionDto } from './dto/create-collection.dto';
import { CollectionsService } from './collections.service';
export declare class CollectionsController {
    private collectionsService;
    constructor(collectionsService: CollectionsService);
    createCollections(collectionDto: CreateCollectionDto, id: string): Promise<import("mongoose").Document<unknown, any, import("./collection.schema").CollectionDocument> & import("./collection.schema").Collection & Document & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    createFromFile(collectionDto: CreateCollectionDto, id: string, file: any): Promise<import("mongoose").Document<unknown, any, import("./collection.schema").CollectionDocument> & import("./collection.schema").Collection & Document & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getCollections(userId: string): Promise<(import("mongoose").Document<unknown, any, import("./collection.schema").CollectionDocument> & import("./collection.schema").Collection & Document & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    updateCollection(collId: string, collectionDto: CreateCollectionDto): Promise<import("@nestjs/common").UnauthorizedException>;
    deleteOneCollection(collId: string): Promise<import("@nestjs/common").UnauthorizedException>;
    deleteManyCollection(collectionDto: CreateCollectionDto): Promise<import("@nestjs/common").UnauthorizedException>;
}
