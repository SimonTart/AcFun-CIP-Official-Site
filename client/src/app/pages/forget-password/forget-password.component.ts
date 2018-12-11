import {Component} from '@angular/core';
import BasePage from '../AppBasePage.component';
import {Title} from '@angular/platform-browser';
import {VerifyCodeService} from '../../../core/services/verify-code.service';
import {UserService} from '../../../core/services/user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {interval} from 'rxjs';
import {finalize, take} from 'rxjs/operators';
import {MessageService} from '../../../ac/message/message.service';
import {Router} from '@angular/router';
import {confirmPasswordValidator} from '../../validators/confirm-password.validator';

@Component({
    selector: 'app-forget-password',
    templateUrl: './forget-password.component.html',
    styleUrls: ['./forget-password.component.styl']
})
export class ForgetPasswordComponent extends BasePage {
    backgorundImageUrl = 'assets/images/pages/register_login.jpg';
    title = 'A站评论补全计划-忘记密码（AcFun Comment Instrumentality Project Forget Password）';
    timeOfResend = 0;
    sendingCode = false;

    resetPasswordForm = new FormGroup({
        email: new FormControl('', {
            validators: [Validators.required, Validators.email],
            updateOn: 'change',
        }),
        verifyCode: new FormControl('', {
            validators: [Validators.required],
            updateOn: 'change',
        }),
        password: new FormControl('', {
            validators: [
                Validators.required,
                Validators.minLength(8),
                confirmPasswordValidator
            ],
            updateOn: 'change',
        }),
        confirmPassword: new FormControl('', {
            validators: [
                Validators.required,
                confirmPasswordValidator
            ],
            updateOn: 'change',
        }),
    });

    private submitting = false;

    constructor(
        public titleService: Title,
        private verifyCodeService: VerifyCodeService,
        private userService: UserService,
        private messageService: MessageService,
        private router: Router,
    ) {
        super(titleService);
    }


    sendCode() {
        if (this.sendingCode || this.timeOfResend > 0) {
            return;
        }

        const emailControl = this.resetPasswordForm.get('email');

        if (!emailControl.dirty) {
            emailControl.markAsDirty();
            emailControl.updateValueAndValidity();
        }


        if (emailControl.status !== 'VALID') {
            return;
        }

        this.sendingCode = true;
        this.verifyCodeService.sendForgetPasswordCode(this.resetPasswordForm.value.email)
            .pipe(finalize(() => this.sendingCode = false))
            .subscribe(
                (data) => {
                    this.messageService.success(data.message);
                    this.sendingCode = false;
                    this.timeOfResend = 60;
                    interval(1000).pipe(take(60)).subscribe((x) => {
                        this.timeOfResend--;
                    });
                },
                (res) => this.messageService.error(res.error.message)
            );
    }

    get verifyCodeButtonTip() {
        if (this.timeOfResend > 0) {
            return `${this.timeOfResend} 秒后可重发`;
        }
        return '发送验证码';
    }

    checkEmail() {
        const emailControl = this.resetPasswordForm.get('email');
        if (emailControl.errors) {
            return;
        }
        this.userService.verifyEmail(emailControl.value).subscribe(
            (data) => {
                const error = data.registered ? null : {unRegistered: true};
                emailControl.setErrors(error);
            }
        );
    }

    onSubmit() {
        for (const i in this.resetPasswordForm.controls) {
            const control = this.resetPasswordForm.controls[i];
            if (!control.dirty) {
                control.markAsDirty();
                control.updateValueAndValidity();
            }
        }

        if (this.resetPasswordForm.status !== 'VALID') {
            return;
        }

        this.submitting = true;
        this.userService.forgetPassword(this.resetPasswordForm.value)
            .pipe(finalize(() => this.submitting = false))
            .subscribe(
                (data) => {
                    this.messageService.success(data.message);
                    setTimeout(() => this.router.navigateByUrl('/login'), 2000);
                },
                (res) => this.messageService.error(res.error.message),
            );
    }

}
