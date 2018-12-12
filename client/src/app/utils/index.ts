import {filter} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpResponse} from '@angular/common/http';
import {STATUS_CODES} from '../../../../common/constant';

@Injectable()
export class HttpPipe {
    constructor(
        private router: Router,
    ) {

    }

    autoRedirectToLogin = (res) => {
        if (res instanceof HttpResponse && res.body.statusCode === STATUS_CODES.NOT_LOGIN) {
            this.router.navigateByUrl('/login');
            return false;
        } else {
            return true;
        }
    };
}
