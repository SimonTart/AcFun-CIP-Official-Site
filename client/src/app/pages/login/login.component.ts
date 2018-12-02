import {Component} from '@angular/core';
import BasePage from "../AppBasePage.component";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.styl']
})
export class LoginComponent extends BasePage {
    backgorundImageUrl = 'assets/images/pages/register_login.jpg';
    title = 'A站评论补全计划-登录(AcFun Comment Instrumentality Project Login)';
}
