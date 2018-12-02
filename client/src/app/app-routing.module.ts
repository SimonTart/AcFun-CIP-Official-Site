import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AcModule} from '../ac/ac.module';
import {RegisterComponent} from './pages/register/register.component';
import {ForgetPasswordComponent} from "./pages/forget-password/forget-password.component";
import {LoginComponent} from "./pages/login/login.component";
import {BrowserExtensionComponent} from "./pages/browser-extension/browser-extension.component";
import {QueryCommentComponent} from "./pages/query-comment/query-comment.component";

const routes: Routes = [
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'forget-password', component: ForgetPasswordComponent},
    {path: 'browser-extension', component: BrowserExtensionComponent},
    {path: 'query-comment', component: QueryCommentComponent},
    {path: '**', redirectTo: '/browser-extension'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [
        RouterModule,
        AcModule,
    ]
})
export class AppRoutingModule {
}
