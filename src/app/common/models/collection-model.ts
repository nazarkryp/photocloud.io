import { Pagination } from './pagination';

export class Collection<T> {
    public pagination: Pagination;
    public data: T[];
    public hasMoreItems: boolean;

    constructor() {
        this.data = new Array<T>();
    }
}
