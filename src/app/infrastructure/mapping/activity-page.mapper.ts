import { PaginationMapper } from './pagination.mapper';
import { Page, ActivityPage } from 'app/models/view';
import { PageResponse, ActivityPageResponse } from 'app/models/response';
import { ActivityMapper } from '.';

export class ActivityPageMapper<S, T> {
    private paginationMapper = new PaginationMapper();

    constructor(
        private mapper: ActivityMapper) { }

    public mapFromResponse(response: ActivityPageResponse): ActivityPage {
        const page = new ActivityPage();

        page.hasMoreItems = response.hasMoreItems;
        page.pagination = response.pagination;
        page.data = this.mapper.mapFromResponseArray(response.data);
        page.unread = response.unread;

        return page;
    }
}
