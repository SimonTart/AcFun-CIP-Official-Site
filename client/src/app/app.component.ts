/// <reference path="../typing.d.ts"/>

import {Component} from '@angular/core';
import {UserService} from '../core/services/user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.styl'],
})
export class AppComponent {
    title = 'client';

    constructor(public userService: UserService) {
        this.userService.get();
    }
}
