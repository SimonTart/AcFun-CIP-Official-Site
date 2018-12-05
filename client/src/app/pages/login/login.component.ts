import {Component} from '@angular/core';
import BasePage from '../AppBasePage.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {UserService} from '../../../core/services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.styl']
})
export class LoginComponent extends BasePage {
    backgorundImageUrl = 'assets/images/pages/register_login.jpg';
    title = 'A站评论补全计划-登录(AcFun Comment Instrumentality Project Login)';

    loginForm = new FormGroup({
        email: new FormControl('', {
            validators: [Validators.required, Validators.email],
            updateOn: 'change',
        }),
        password: new FormControl('', {
            validators: [Validators.required],
            updateOn: 'change',
        }),
    });

    submitting = false;

    constructor(
        titleService: Title,
        private userService: UserService,
    ) {
        super(titleService);
    }

    onSubmit() {
        if (this.submitting) {
            return;
        }
        for (const i in this.loginForm.controls) {
            this.loginForm.controls[i].markAsDirty();
            this.loginForm.controls[i].updateValueAndValidity();
        }

        if (this.loginForm.status !== 'VALID') {
            return;
        }

        this.userService.login(this.loginForm.value).subscribe((data) => {
            console.log(data.message);
        }, (res) => console.log(res.error.message)));
    }
}
