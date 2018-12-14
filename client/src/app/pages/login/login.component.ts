import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {UserService} from '../../../core/services/user.service';
import {MessageService} from '../../../ac/message/message.service';
import {finalize} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AppBasePageComponent} from '../AppBasePage.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.styl']
})
export class LoginComponent extends AppBasePageComponent {
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
                this.userService.get();
                setTimeout(() => this.router.navigateByUrl('/browser-extension'), 2000);
            },
            (error) => this.messageService.error(error.message)
        );
    }
}
