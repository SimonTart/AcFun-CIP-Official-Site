import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RegistComponent} from './pages/regist/regist.component';
import {NavComponent} from './common/nav/nav.component';
import {AcModule} from '../ac/ac.module';

@NgModule({
    declarations: [
        AppComponent,
        RegistComponent,
        NavComponent,
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
