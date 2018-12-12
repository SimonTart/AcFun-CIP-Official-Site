import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, filter, map} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {STATUS_CODES} from '../../../../common/constant';
import {Router} from '@angular/router';


@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(
                map((res) => {
                    if (res instanceof HttpResponse && res.body.statusCode !== STATUS_CODES.SUCCESS) {
                        throw { body: res.body, message: res.body.message };
                    } else {
                        return res;
                    }
                })
            );
    }
}
