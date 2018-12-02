import {Component, OnInit, Input, ElementRef, Renderer2, HostListener} from '@angular/core';

export type InputSize = 'medium' | 'large';

@Component({
    selector: 'input[ac-input]',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.styl'],
})
export class InputComponent implements OnInit {

    constructor(private input: ElementRef, private renderer: Renderer2) {
    }

    classMap = {};
    private _size: InputSize = 'medium';


    @Input('ac-size')
    set size(size: InputSize) {
        this._size = size || 'medium';
        this.setClass();
    }

    setClass() {
        const oldClasses = Object.keys(this.classMap).filter((key) => !!this.classMap[key]);
        this.classMap = {
            [this._size]: true,
        };
        const newClasses = Object.keys(this.classMap).filter((key) => !!this.classMap[key]);
        if (oldClasses.length > 0) {
            oldClasses.forEach((oldClass) => this.renderer.removeClass(this.input.nativeElement, oldClass));
        }
        if (newClasses.length > 0) {
            newClasses.forEach((newClass) => this.renderer.addClass(this.input.nativeElement, newClass));
        }

    }

    ngOnInit() {
        this.setClass();
    }

}
