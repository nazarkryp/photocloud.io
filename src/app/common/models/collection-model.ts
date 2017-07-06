import { Pagination } from './pagination';
import { Post } from './post';

export class CollectionModel {
    pagination: Pagination;
    data: Post[];
    hasMoreItems: boolean;
}
