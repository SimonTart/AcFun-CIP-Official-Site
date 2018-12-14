import {Component} from '@angular/core';
import { Message } from './message.component';

@Component({
    selector: 'ac-message-container',
    templateUrl: './message-container.component.html',
    styleUrls: ['./message-container.component.styl'],
})
export class MessageContainerComponent {
    messages: Array<Message> = [];

    trackMessage(index, message) {
        return message.id;
    }

    createMessage(message: Message) {
        this.messages.push(message);
    }

    removeMessage(id: number) {
        this.messages = this.messages.filter((message) => message.id !== id);
    }
}
