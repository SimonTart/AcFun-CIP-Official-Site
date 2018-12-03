import {AbstractControl, AsyncValidator, ValidationErrors} from '@angular/forms';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UserService} from '../../core/services/user.service';
import {catchError, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class UniqueEmailValidator implements AsyncValidator {
    constructor(private userService: UserService) {

    }

    validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        return this.userService.verifyEmail(control.value).pipe(
            map(data => data.registered ? {registered: true} : null),
            catchError(() => null),
        );
    }
}
