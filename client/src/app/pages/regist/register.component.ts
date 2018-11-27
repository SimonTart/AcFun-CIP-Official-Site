import {Component} from '@angular/core';
import BasePage from "../BasePage";

@Component({
    selector: 'cip-regist',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.styl']
})


export class RegisterComponent extends BasePage {
    backgorundImageUrl = 'assets/images/pages/register_login.jpg';
    title = 'AcFun Comment Instrumentality Project（A站评论补全计划)-注册';
}
