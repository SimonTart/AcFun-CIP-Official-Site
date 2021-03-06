/// <reference path="../../typing.d.ts"/>
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


interface VerifyEmailData extends ResponseData {
    registered: boolean;
}

interface VerifyNameData extends ResponseData {
    used: boolean;
}

interface AccountData extends ResponseData {
    user: User;
}

interface IsLoginData extends ResponseData {
    isLogin: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {
    }

    user: (User | {}) = {};

    isLogin() {
        return this.http.get<IsLoginData>('/api/user/is-login');
    }

    get() {
        return this.http.get<AccountData>('/api/user/account').subscribe((data) => this.user = data.user);
    }

    register(user) {
        return this.http.post<ResponseData>('/api/user/register', user);
    }

    forgetPassword(user) {
        return this.http.post<ResponseData>('/api/user/forget-password', user);
    }

    login(user) {
        return this.http.post<ResponseData>('/api/user/login', user);
    }

    verifyEmail(email) {
        return this.http.post<VerifyEmailData>('/api/user/verify-email', {email});
    }

    verifyName(name) {
        return this.http.post<VerifyNameData>('/api/user/verify-name', {name});
    }
}
