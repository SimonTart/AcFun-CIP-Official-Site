import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {UserService} from '../../core/services/user.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {MessageService} from '../../ac/message/message.service';

@Injectable({
    providedIn: 'root',
})
export class LoginAuthGuard implements CanActivate {
    constructor(
        private message: MessageService,
        private userService: UserService,
        private router: Router,
    ) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const user = this.userService.user;
        if (!('isLogin' in user)) {
            // 还没获取到用户信息
            return true;
        } else if (user.isLogin) {
            // 已经获取到并且登陆了
            return true;
        } else {
            this.message.error('请先登录');
            this.router.navigateByUrl('/login');
            return false;
        }
    }
}
