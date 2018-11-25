import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'cip-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.styl']
})
export class NavComponent implements OnInit {
    navList = [
        {name: '插件下载', link: '/browser-extension'},
        {name: '评论查询', link: '/comment-query'},
        {name: '登录/注册', link: '/regist', activeReg: /\/(regist|login)/},
    ];

    constructor(public router: Router) {
    }

    ngOnInit() {
    }

}
