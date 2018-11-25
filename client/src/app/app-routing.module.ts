import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AcModule} from '../ac/ac.module';
import {RegistComponent} from './pages/regist/regist.component';

const routes: Routes = [
    {path: 'regist', component: RegistComponent},
    {path: 'browser-extension', component: RegistComponent},
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
