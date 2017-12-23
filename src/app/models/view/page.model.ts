import { PaginationViewModel } from './pagination.model';

export class PageViewModel<T> {
    public data: T[] = new Array<T>();
    public pagination: PaginationViewModel;
    public hasMoreItems: boolean;
}
