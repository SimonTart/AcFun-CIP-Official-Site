import {Component, Input} from '@angular/core';

@Component({
    selector: 'cip-query-comment-result-comment-item',
    templateUrl: './query-comment-result-comment-item.component.html',
    styleUrls: ['./query-comment-result-comment-item.component.styl']
})
export class QueryCommentResultCommentItemComponent {
    @Input() comment: Comment;
}
