/// <reference path="../../../typing.d.ts"/>

import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'cip-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.styl']
})
export class NavComponent {
    navList = [
        {name: '插件下载', link: '/browser-extension'},
        {name: '评论查询', link: '/query-comment'},
    ];

    private isActiveLoginRegexp =  /\/(register|login|forget-password)/;

    constructor(public router: Router) {
    }

    @Input() user: User;
}
