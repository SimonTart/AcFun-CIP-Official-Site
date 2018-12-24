import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AppBasePageComponent} from '../AppBasePage.component';
import {VerifyCodeService} from '../../../core/services/verify-code.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {interval} from 'rxjs';
import {finalize, take} from 'rxjs/operators';
import {UserService} from '../../../core/services/user.service';
import {UniqueEmailValidator} from '../../validators/unique-email.validator';
import {UniqueNameValidator} from '../../validators/unique-name.validator';
import {MessageService} from '../../../ac/message/message.service';
import {Router} from '@angular/router';
import {confirmPasswordValidator} from '../../validators/confirm-password.validator';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.styl']
})
export class RegisterComponent extends AppBasePageComponent {
    backgorundImageUrl = require('../../assets/images/pages/register_login.jpg');
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
                confirmPasswordValidator,
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
        private messageService: MessageService,
        private router: Router
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
        this.verifyCodeService.sendRegisterCode(this.registerForm.value.email)
            .pipe(finalize(() => this.sendingCode = false))
            .subscribe(
                (data) => {
                    this.messageService.success(data.message);
                    this.timeOfResend = 60;
                    this.sendingCode = false;
                    interval(1000).pipe(take(60)).subscribe((x) => {
                        this.timeOfResend--;
                    });
                },
                (error) => this.messageService.error(error.message)
            );
    }

    get verifyCodeButtonTip() {
        if (this.timeOfResend > 0) {
            return `${this.timeOfResend} 秒后可重发`;
        }
        return '发送验证码';
    }

    checkEmail() {
        const emailControl = this.registerForm.get('email');
        if (emailControl.errors) {
            return;
        }
        this.uniqueEmailValidator.validate(emailControl).subscribe(
            (error) => emailControl.setErrors(error),
        );
    }

    checkName() {
        const nameControl = this.registerForm.get('name');
        if (nameControl.errors) {
            return;
        }
        this.uniqueNameValidator.validate(nameControl).subscribe(
            (error) => nameControl.setErrors(error),
        );
    }

    onSubmit() {
        for (const i in this.registerForm.controls) {
            const control = this.registerForm.controls[i];
            if (!control.dirty) {
                control.markAsDirty();
                control.updateValueAndValidity();
            }
        }

        if (!this.registerForm.get('email').errors) {
            this.checkEmail();
        }

        if (!this.registerForm.get('name').errors) {
            this.checkName();
        }

        if (this.registerForm.status !== 'VALID') {
            return;
        }
        this.submitting = true;
        this.userService.register(this.registerForm.value)
            .pipe(finalize(() => this.submitting = false))
            .subscribe(
                (data) => {
                    this.messageService.success(data.message);
                    setTimeout(() => this.router.navigateByUrl('/login'), 2000);
                },
                (error) => this.messageService.error(error.message)
            );
    }


}
