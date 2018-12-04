import {Component} from '@angular/core';
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
        {name: '登录/注册', link: '/login', activeReg: /\/(register|login|forget-password)/},
    ];

    constructor(public router: Router) {
    }

}
