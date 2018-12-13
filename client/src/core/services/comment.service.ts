/// <reference path="../../typing.d.ts"/>
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


export interface QueryCommentData extends ResponseData {
    contentCount: number;
    commentCount: number;
    comments: Array<Comment>;
    contents: Array<Content>;
}



@Injectable({
    providedIn: 'root'
})
export class CommentService {

    constructor(private http: HttpClient) {
    }

    query(body) {
        return this.http.post<QueryCommentData>('/api/comment/query', body);
    }
}
