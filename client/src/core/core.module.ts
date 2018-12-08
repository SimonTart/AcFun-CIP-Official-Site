import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserService} from './services/user.service';
import {VerifyCodeService} from './services/verify-code.service';

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    exports: [],
    providers: [
        UserService,
        VerifyCodeService,
    ]
})
export class CoreModule {
}
