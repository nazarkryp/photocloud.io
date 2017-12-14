import { Pagination } from './pagination';

export class Page<T> {
    public pagination: Pagination;
    public data: T[];
    public hasMoreItems: boolean;

    constructor() {
        this.data = new Array<T>();
    }
}
