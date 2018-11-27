import {Component} from '@angular/core';

@Component({
    selector: 'cip-query-comment-result-item',
    templateUrl: './query-comment-result-item.component.html',
    styleUrls: ['./query-comment-result-item.component.styl']
})
export class QueryCommentResultItemComponent {

    private open: boolean = false;

    toggle() {
        this.open = !this.open;
    }

}
