import { Pagination } from './pagination';

export class CollectionModel<T> {
    pagination: Pagination;
    data: T[];
    hasMoreItems: boolean;
}
