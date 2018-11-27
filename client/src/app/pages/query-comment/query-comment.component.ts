import {Component, OnInit} from '@angular/core';
import BasePage from "../BasePage";

@Component({
    selector: 'app-query-comment',
    templateUrl: './query-comment.component.html',
    styleUrls: ['./query-comment.component.styl']
})
export class QueryCommentComponent extends BasePage implements OnInit {
    backgorundImageUrl = 'assets/images/pages/query_comment.jpg';
    title = 'A站评论补全计划-评论查询(AcFun Comment Instrumentality Project Query Comment)';

    ngOnInit() {
    }

}
