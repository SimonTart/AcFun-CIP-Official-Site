import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

const DEFAULT_DURATION = 2000;

export interface Message {
    id: number;
    type: string;
    content: string;
    state?: string;
}

@Component({
    selector: 'ac-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.styl'],
    animations: [
        trigger('enterLeave', [
            state('enter', style({
                opacity: 1,
                transform: 'translateY(0)'
            })),
            transition('* => enter', [
                style({
                    opacity: 0,
                    transform: 'translateY(-50%)'
                }),
                animate('200ms linear')
            ]),
            state('leave', style({
                opacity: 0,
                transform: 'translateY(-50%)'
            })),
            transition('* => leave', [
                style({
                    opacity: 1,
                    transform: 'translateY(0)'
                }),
                animate('200ms linear')
            ])

        ])
    ]
})
export class MessageComponent implements OnInit {
    @Input() message: Message;
    @Output() private remove =  new EventEmitter<number>();

    private showTimer: number;

    ngOnInit(): void {
        this.init();
    }

    private init(): void {
        this.message.state = 'enter';
        this.showTimer = window.setTimeout(() => this.destroy(), DEFAULT_DURATION);
    }

    private destroy(): void {
        this.message.state = 'leave';
        window.setTimeout(() => this.remove.emit(this.message.id), 200);
    }
}
