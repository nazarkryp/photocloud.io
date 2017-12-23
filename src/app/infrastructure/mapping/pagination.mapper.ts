import { Injectable } from '@angular/core';

import { PaginationResponse } from 'app/models/response';
import { PaginationViewModel } from 'app/models/view';

@Injectable()
export class PaginationMapper {
    public mapFromResponse(response: PaginationResponse): PaginationViewModel {
        const pagination = new PaginationViewModel();

        pagination.next = response.next;
        pagination.previous = response.previous;

        return pagination;
    }
}
