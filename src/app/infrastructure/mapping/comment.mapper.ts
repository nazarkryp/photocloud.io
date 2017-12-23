import { Injectable } from '@angular/core';
import { CommentResponse } from 'app/models/response';
import { CommentViewModel } from 'app/models/view';
import { UserMapper } from 'app/infrastructure/mapping/user.mapper';

@Injectable()
export class CommentMapper {
    constructor(
        private userMapper: UserMapper) { }

    public mapFromResponse(response: CommentResponse): CommentViewModel {
        const comment = new CommentViewModel();

        comment.id = response.id;
        comment.text = response.text;
        comment.date = response.date;
        comment.user = this.userMapper.mapFromResponse(response.user);

        return comment;
    }

    public mapFromResponseArray(responseArray: CommentResponse[]): CommentViewModel[] {
        return responseArray.map(e => this.mapFromResponse(e));
    }
}
