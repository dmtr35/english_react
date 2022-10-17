import { CreateCollectionDto } from './dto/create-collection.dto';
import { CollectionsService } from './collections.service';
export declare class CollectionsController {
    private collectionsService;
    constructor(collectionsService: CollectionsService);
    createCollections(collectionDto: CreateCollectionDto, id: string, dictionary: any): Promise<void>;
}
