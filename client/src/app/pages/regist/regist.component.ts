import {Component, OnInit} from '@angular/core';
import BasePage from "../BasePage";

@Component({
    selector: 'cip-regist',
    templateUrl: './regist.component.html',
    styleUrls: ['./regist.component.styl']
})


export class RegistComponent extends BasePage implements OnInit {
    backgorundImageUrl = 'assets/images/pages/regist_login.jpg';
    title = 'AcFun Comment Instrumentality Project（A站评论补全计划)-登录';

    ngOnInit() {
    }

}
