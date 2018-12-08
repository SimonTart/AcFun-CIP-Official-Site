import {Component, Input} from '@angular/core';

export interface Message {
    id: number;
    type: string;
    content: string;
}

@Component({
    selector: 'ac-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.styl'],
})
export class MessageComponent {
    @Input() private message: Message;
}
