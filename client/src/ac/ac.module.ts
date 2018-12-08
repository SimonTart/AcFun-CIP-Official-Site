import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonComponent} from './button/button.component';
import {InputComponent} from './input/input.component';
import {FormFieldComponent} from './form-field/form-field.component';
import {FormFieldErrorComponent} from './form-field-error/form-field-error.component';
import {MessageComponent} from './message/message.component';
import {MessageContainerComponent} from './message/message-container.component';
import {MessageService} from './message/message.service';

@NgModule({
    declarations: [
        ButtonComponent,
        InputComponent,
        FormFieldComponent,
        FormFieldErrorComponent,
        MessageComponent,
        MessageContainerComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ButtonComponent,
        InputComponent,
        FormFieldComponent,
        FormFieldErrorComponent,
        MessageComponent,
        MessageContainerComponent
    ],
    providers: [
        MessageService,
    ],
    entryComponents: [
        MessageContainerComponent,
    ]
})
export class AcModule {
}
