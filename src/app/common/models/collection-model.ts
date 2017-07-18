import { Pagination } from './pagination';

export class Collection<T> {
    pagination: Pagination;
    data: T[];
    hasMoreItems: boolean;
}
