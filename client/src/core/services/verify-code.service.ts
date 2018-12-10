/// <reference path="../../typing.d.ts"/>
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class VerifyCodeService {

    constructor(private http: HttpClient) {
    }

    sendRegisterCode(email) {
        return this.http.post<ResponseData>('/api/verify-code/register', {email});
    }

    sendForgetPasswordCode(email) {
        return this.http.post<ResponseData>('/api/verify-code/forget-password', {email});
    }
}
