import {Component} from '@angular/core';
import BasePage from "../BasePage";

@Component({
    selector: 'cip-forget-password',
    templateUrl: './forget-password.component.html',
    styleUrls: ['./forget-password.component.styl']
})
export class ForgetPasswordComponent extends BasePage {
    backgorundImageUrl = 'assets/images/pages/register_login.jpg';
    title = 'A站评论补全计划-忘记密码（AcFun Comment Instrumentality Project Forget Password）';
}
