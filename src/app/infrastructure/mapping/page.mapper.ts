import { IMapper } from 'app/infrastructure/mapping/mapper';
import { PaginationMapper } from './pagination.mapper';
import { PageViewModel } from 'app/models/view';
import { PageResponse } from 'app/models/response';

export class PageMapper<S, T> {
    private paginationMapper = new PaginationMapper();

    constructor(
        private mapper: IMapper<S, T>) { }

    public mapFromResponse(response: PageResponse<S>): PageViewModel<T> {
        const page = new PageViewModel<T>();
        console.log(response);
        page.hasMoreItems = response.hasMoreItems;
        page.pagination = response.pagination;
        page.data = this.mapper.mapFromResponseArray(response.data);
        return page;
    }
}
