import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import BasePage from '../AppBasePage.component';
import {VerifyCodeService} from '../../../core/services/verify-code.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {interval} from 'rxjs';
import {take} from 'rxjs/operators';
import {UserService} from '../../../core/services/user.service';
import {UniqueEmailValidator} from '../../validators/unique-email.validator';
import {UniqueNameValidator} from '../../validators/unique-name.validator';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.styl']
})
export class RegisterComponent extends BasePage {
    backgorundImageUrl = 'assets/images/pages/register_login.jpg';
    title = 'AcFun Comment Instrumentality Project（A站评论补全计划)-注册';
    timeOfResend = 0;
    sendingCode = false;
    submitting = false;

    registerForm = new FormGroup({
        email: new FormControl('', {
            validators: [Validators.required, Validators.email],
            updateOn: 'change',
        }),
        name: new FormControl('', {
            validators: [Validators.required],
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
        public titleService: Title,
        private uniqueEmailValidator: UniqueEmailValidator,
        private uniqueNameValidator: UniqueNameValidator,
        private verifyCodeService: VerifyCodeService,
        private userService: UserService,
    ) {
        super(titleService);
    }

    sendCode() {
        if (this.sendingCode || this.timeOfResend > 0) {
            return;
        }

        const emailControl = this.registerForm.get('email');
        emailControl.markAsDirty();
        emailControl.updateValueAndValidity();

        if (emailControl.status !== 'VALID') {
            return;
        }

        this.sendingCode = true;
        this.verifyCodeService.sendRegisterCode(this.registerForm.value.email).subscribe(() => {
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

    onEmailBlur() {
        const emailControl = this.registerForm.get('email');
        if (emailControl.errors) {
            return;
        }
        this.uniqueEmailValidator.validate(emailControl).subscribe(
            (error) => emailControl.setErrors(error),
        );
    }

    onNameBlur() {
        const nameControl = this.registerForm.get('name');
        if (nameControl.errors) {
            return;
        }
        this.uniqueNameValidator.validate(nameControl).subscribe(
            (error) => nameControl.setErrors(error),
        );
    }

    onSubmit() {
        if (this.submitting) {
            return;
        }
        for (const i in this.registerForm.controls) {
            this.registerForm.controls[i].markAsDirty();
            this.registerForm.controls[i].updateValueAndValidity();
        }

        if (this.registerForm.status !== 'VALID') {
            return;
        }

        this.userService.register(this.registerForm.value).subscribe(() => {
            console.log('注册成功');
        });
    }


}
