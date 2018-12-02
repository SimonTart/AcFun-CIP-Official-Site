import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import BasePage from '../AppBasePage.component';
import {VerifyCodeService} from '../../../core/services/verify-code.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.styl']
})
export class RegisterComponent extends BasePage implements OnInit {
    backgorundImageUrl = 'assets/images/pages/register_login.jpg';
    title = 'AcFun Comment Instrumentality Project（A站评论补全计划)-注册';

    RESEND_TIME = 60;
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
            validators: [Validators.required],
            updateOn: 'change',
        }),
        confirmPassword: new FormControl('', {
            validators: [Validators.required],
            updateOn: 'change',
        }),
    });

    json = JSON

    constructor(
        titleService: Title,
        private verifyCodeService: VerifyCodeService
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
        this.sendingCode = true;
        this.verifyCodeService.sendRegisterCode(this.registerForm.value.email).subscribe(() => {
            this.sendingCode = false;
            this.timeOfResend = this.RESEND_TIME;
        });
    }

    onSubmit() {
        console.log('submt');
    }


}
