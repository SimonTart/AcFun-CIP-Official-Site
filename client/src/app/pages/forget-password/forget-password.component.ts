import {Component} from '@angular/core';
import BasePage from '../AppBasePage.component';
import {Title} from '@angular/platform-browser';
import {VerifyCodeService} from '../../../core/services/verify-code.service';
import {UserService} from '../../../core/services/user.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {interval} from 'rxjs';
import {take} from 'rxjs/operators';

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
            validators: [Validators.required, Validators.minLength(8)],
            updateOn: 'change',
        }),
        confirmPassword: new FormControl('', {
            validators: [
                Validators.required,
                (control: AbstractControl): { [key: string]: any } | null => {
                    const password = control.parent && control.parent.get('password').value;
                    const confirmPassword = control.value;
                    return password === confirmPassword ? null : {notSame: true};

                }
            ],
            updateOn: 'change',
        }),
    });

    constructor(
        titleService: Title,
        private verifyCodeService: VerifyCodeService,
        private userService: UserService,
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
        this.verifyCodeService.sendForgetPasswordCode(this.resetPasswordForm.value.email).subscribe(() => {
            this.sendingCode = false;
            interval(1000).pipe(take(60)).subscribe((x) => {
                this.timeOfResend = 59 - x;
            });
        });
    }

    get verifyCodeButtonTip() {
        if (this.timeOfResend > 0) {
            return `${this.timeOfResend}秒后可重发`;
        }
        if (this.sendingCode) {
            return '发送中...';
        }
        return '发送验证码';
    }

    checkEmailRegistered() {
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

        this.userService.forgetPassword(this.resetPasswordForm.value).subscribe(() => {
            console.log('重置成功');
        });
    }

}
