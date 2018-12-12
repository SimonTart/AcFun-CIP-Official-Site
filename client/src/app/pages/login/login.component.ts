import {Component} from '@angular/core';
import BasePage from '../AppBasePage.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {UserService} from '../../../core/services/user.service';
import {MessageService} from '../../../ac/message/message.service';
import {finalize} from 'rxjs/operators';
import {Router} from '@angular/router';

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

    private submitting = false;

    constructor(
        public titleService: Title,
        private userService: UserService,
        private messageService: MessageService,
        private router: Router,
    ) {
        super(titleService);
    }

    onSubmit() {
        for (const i in this.loginForm.controls) {
            const control = this.loginForm.controls[i];
            if (!control.dirty) {
                control.markAsDirty();
                control.updateValueAndValidity();
            }
        }

        if (this.loginForm.status !== 'VALID') {
            return;
        }

        this.submitting = true;
        this.userService.login(this.loginForm.value)
            .pipe(
                finalize(() => this.submitting = false )
            )
            .subscribe(
            (data) => {
                this.messageService.success(data.message);
                setTimeout(() => window.location.href = '/browser-extension', 2000);
            },
            (error) => this.messageService.error(error.message)
        );
    }
}
