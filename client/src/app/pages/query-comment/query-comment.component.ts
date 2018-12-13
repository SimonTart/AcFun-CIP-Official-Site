/// <reference path="../../../typing.d.ts"/>
import {Component, OnInit} from '@angular/core';
import BasePage from '../AppBasePage.component';
import {UserService} from '../../../core/services/user.service';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {MessageService} from '../../../ac/message/message.service';
import {CommentService, QueryCommentData} from '../../../core/services/comment.service';
import {finalize} from 'rxjs/operators';

@Component({
    selector: 'app-query-comment',
    templateUrl: './query-comment.component.html',
    styleUrls: ['./query-comment.component.styl']
})
export class QueryCommentComponent extends BasePage implements OnInit {
    backgorundImageUrl = 'assets/images/pages/query_comment.jpg';
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

    private hasResult = false;
    private searching = false;
    private result: QueryCommentData | {} = {};
    private contentIdToComments: { any: Comment } | {} = {};
    private contents: Array<Content> = [];

    ngOnInit(): void {
        this.userService.isLogin().subscribe((data) => {
            if (!data.isLogin) {
                this.message.error('请先登录');
                this.router.navigateByUrl('/login');
            }
        });
    }

    processResult(result: QueryCommentData): void {
        for (const comment of result.comments) {
            const existComments = this.contentIdToComments[comment.contentId] || [];
            existComments.push(comment);
            this.contentIdToComments[comment.contentId] = existComments;
        }
        this.contents.push(...result.contents);
    }


    onSearch(userIdInput): void {
        const userId = (userIdInput.input.nativeElement.value || '').trim();
        if (!userId) {
            this.message.error('请先输入要查询的用户ID');
            return;
        }

        this.searching = true;
        const params = {
            pageSize: 20,
            pageNumber: 1,
            userId,
        };

        this.commentService.query(params)
            .pipe(finalize(() => this.searching = false))
            .subscribe(
                (data) => {
                    if (params.pageNumber === 1) {
                        this.contentIdToComments = {};
                        this.contents = [];
                    }
                    this.result = data;
                    this.processResult(data);
                    this.hasResult = true;
                },
                (error) => this.message.error(error.message),
            );
    }
}
