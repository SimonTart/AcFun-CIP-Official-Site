import {Component} from '@angular/core';
import { Message } from './message.component';


@Component({
    selector: 'ac-message-container',
    templateUrl: './message-container.component.html',
    styleUrls: ['./message-container.component.styl'],
})
export class MessageContainerComponent {
    private messages: Array<Message> = [];

    createMessage(message: Message) {
        this.messages.push(message);
    }
}
