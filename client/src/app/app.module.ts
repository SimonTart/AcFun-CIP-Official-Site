import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RegisterComponent} from './pages/regist/register.component';
import {NavComponent} from './common/nav/nav.component';
import {AcModule} from '../ac/ac.module';
import { LoginComponent } from './pages/login/login.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { BrowserExtensionComponent } from './pages/browser-extension/browser-extension.component';
import { QueryCommentComponent } from './pages/query-comment/query-comment.component';

@NgModule({
    declarations: [
        AppComponent,
        RegisterComponent,
        NavComponent,
        LoginComponent,
        ForgetPasswordComponent,
        BrowserExtensionComponent,
        QueryCommentComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AcModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
