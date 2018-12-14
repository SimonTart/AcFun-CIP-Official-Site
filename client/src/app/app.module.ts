import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RegisterComponent} from './pages/register/register.component';
import {NavComponent} from './common/nav/nav.component';
import {AcModule} from '../ac/ac.module';
import {CoreModule} from '../core/core.module';
import {LoginComponent} from './pages/login/login.component';
import {ForgetPasswordComponent} from './pages/forget-password/forget-password.component';
import {BrowserExtensionComponent} from './pages/browser-extension/browser-extension.component';
import {QueryCommentComponent} from './pages/query-comment/query-comment.component';
import {QueryCommentResultItemComponent} from './common/query-comment-result-item/query-comment-result-item.component';
import {QueryCommentResultCommentItemComponent} from './common/query-comment-result-comment-item/query-comment-result-comment-item.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpErrorInterceptor} from './interceptors/http-error.interceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppBasePageComponent} from './pages/AppBasePage.component';


@NgModule({
    declarations: [
        AppComponent,
        RegisterComponent,
        NavComponent,
        LoginComponent,
        ForgetPasswordComponent,
        BrowserExtensionComponent,
        QueryCommentComponent,
        QueryCommentResultItemComponent,
        QueryCommentResultCommentItemComponent,
        AppBasePageComponent,
    ],
    imports: [
        ReactiveFormsModule,
        BrowserModule,
        AppRoutingModule,
        AcModule,
        CoreModule,
        HttpClientModule,
        BrowserAnimationsModule,
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
