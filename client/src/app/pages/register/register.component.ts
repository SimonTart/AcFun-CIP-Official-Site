import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import BasePage from '../AppBasePage.component';
import {VerifyCodeService} from '../../../core/services/verify-code.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {interval} from 'rxjs';
import {take} from 'rxjs/operators';
import {UserService} from '../../../core/services/user.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.styl']
})
export class RegisterComponent extends BasePage implements OnInit {
    backgorundImageUrl = 'assets/images/pages/register_login.jpg';
    title = 'AcFun Comment Instrumentality Project（A站评论补全计划)-注册';
    timeOfResend = 0;
    sendingCode = false;

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
        titleService: Title,
        private verifyCodeService: VerifyCodeService,
        private userService: UserService,
    ) {
        super(titleService);
        this.verifyCodeService = verifyCodeService;
    }

    ngOnInit(): void {
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

    onSubmit() {
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
