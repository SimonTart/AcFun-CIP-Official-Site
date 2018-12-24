/// <reference path="../../../typing.d.ts"/>
import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../core/services/user.service';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {MessageService} from '../../../ac/message/message.service';
import {CommentService, QueryCommentData} from '../../../core/services/comment.service';
import {finalize} from 'rxjs/operators';
import {AppBasePageComponent} from '../AppBasePage.component';

@Component({
    selector: 'app-query-comment',
    templateUrl: './query-comment.component.html',
    styleUrls: ['./query-comment.component.styl']
})
export class QueryCommentComponent extends AppBasePageComponent implements OnInit {
    backgorundImageUrl = require('../../assets/images/pages/query_comment.jpg');
    title = 'A站评论补全计划-评论查询(AcFun Comment Instrumentality Project Query Comment)';

    constructor(
        public titleService: Title,
        private userService: UserService,
        private commentService: CommentService,
        private router: Router,
        private message: MessageService,
    ) {
        super(titleService);
    }

    hasResult = false;
    searching = false;
    loadingMore = false;
    result: QueryCommentData;
    contentIdToComments: { any: Array<Comment> };
    contents: Array<Content> = [];
    pageNumber: number;
    userId: number;

    ngOnInit(): void {
        this.userService.isLogin().subscribe((data) => {
            if (!data.isLogin) {
                this.message.error('请先登录');
                this.router.navigateByUrl('/login');
            }
        });
    }

    trackContentBy(index, content) {
        return content.id;
    }

    processResult(result: QueryCommentData): void {
        const contentIdToComments = this.contentIdToComments || {};
        for (const comment of result.comments) {
            const existComments = contentIdToComments[comment.contentId] || [];
            existComments.push(comment);
            contentIdToComments[comment.contentId] = existComments;
        }
        this.contentIdToComments = contentIdToComments as { any: Array<Comment> };
        this.contents.push(...result.contents);
    }


    onSearch(userIdInput): void {
        const userId = (userIdInput.input.nativeElement.value || '').trim();
        if (!userId) {
            this.message.error('请先输入要查询的用户ID');
            return;
        }

        this.searching = true;
        this.userId = userId;
        this.queryComment({userId, pageNumber: 1}, () => this.searching = false);
    }

    loadMore() {
        if (this.loadingMore) {
            return;
        }
        this.loadingMore = true;
        this.queryComment({userId: this.userId, pageNumber: this.pageNumber + 1}, () => this.loadingMore = false);
    }

    queryComment({userId, pageNumber}, finalizeFn) {
        const params = {
            pageSize: 20,
            pageNumber,
            userId,
        };
        return this.commentService.query(params)
            .pipe(finalize(() => finalizeFn()))
            .subscribe(
                (data) => {
                    if (params.pageNumber === 1) {
                        this.contentIdToComments = null;
                        this.contents = [];
                    }
                    this.pageNumber = pageNumber;
                    this.result = data;
                    this.processResult(data);
                    this.hasResult = true;
                },
                (error) => this.message.error(error.message),
            );
    }
}
