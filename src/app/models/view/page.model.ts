import { PaginationViewModel } from './pagination.model';

export class Page<T> {
    public data: T[] = new Array<T>();
    public pagination: PaginationViewModel;
    public hasMoreItems: boolean;
}
