import {AbstractControl} from '@angular/forms';

function isEmptyInputValue(value: any): boolean {
    // we don't check for string here so it also works with arrays
    return value == null || value.length === 0;
}

export function confirmPasswordValidator(control: AbstractControl): { [key: string]: any } | null {
    if (!control.parent) {
        return null;
    }
    const confirmPasswordControl = control.parent.get('confirmPassword');
    if (!confirmPasswordControl.dirty) {
        return null;
    }
    const password = control.parent.get('password').value;
    const confirmPassword = confirmPasswordControl.value;
    let notSameErrors;
    if (isEmptyInputValue(confirmPassword)) {
        notSameErrors = null;
    } else if (password !== confirmPassword) {
        notSameErrors = {notSame: true};
    } else {
        notSameErrors = null;
    }

    if (control !== confirmPasswordControl) {
        confirmPasswordControl.setErrors(notSameErrors);
    } else {
        return notSameErrors;
    }
    return null;
}
