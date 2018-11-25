import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonComponent} from './button/button.component';
import { InputComponent } from './input/input.component';
import { FormFieldComponent } from './form-field/form-field.component';
import { FormFieldErrorComponent } from './form-field-error/form-field-error.component';

@NgModule({
    declarations: [ButtonComponent, InputComponent, FormFieldComponent, FormFieldErrorComponent],
    imports: [
        CommonModule
    ],
    exports: [ButtonComponent, InputComponent, FormFieldComponent, FormFieldErrorComponent],
})
export class AcModule {
}
