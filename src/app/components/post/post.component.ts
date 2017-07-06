import { Component, OnInit, Input } from '@angular/core';

import { Post } from '../../common/models/post';
import { Attachment } from '../../common/models/attachment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @Input()
  post: Post;
}
