import {Component, Input} from '@angular/core';

@Component({
    selector: 'cip-query-comment-result-item',
    templateUrl: './query-comment-result-item.component.html',
    styleUrls: ['./query-comment-result-item.component.styl']
})
export class QueryCommentResultItemComponent {

    open = false;

    @Input() content: Content;

    @Input() comments: Array<Comment>;

    toggle() {
        this.open = !this.open;
    }

    tackCommentBy(index, comment) {
        return comment.id;
    }

    get link() {
        return this.content.contentType === 'article' ?
            `http://www.acfun.cn/a/ac${this.content.id}`
            : `http://www.acfun.cn/v/ac${this.content.id}}`;
    }
}
