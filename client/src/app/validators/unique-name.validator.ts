import {AbstractControl, AsyncValidator, ValidationErrors} from '@angular/forms';
import {Injectable} from '@angular/core';
import {UserService} from '../../core/services/user.service';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class UniqueNameValidator implements AsyncValidator {
    constructor(private userService: UserService) {

    }

    validate(control: AbstractControl): Observable<ValidationErrors | null> {
        return this.userService.verifyName(control.value).pipe(
            map(data => data.isUsed ? {'used': true} : null),
            catchError(() => null)
        );
    }
}
