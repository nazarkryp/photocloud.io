import { PaginationResponse } from './pagination-respone.model';

export class PageResponse<T> {
    public data: T[] = new Array<T>();
    public pagination: PaginationResponse;
    public hasMoreItems: boolean;
}
