import {Component, OnInit, Input, HostBinding, ElementRef, Renderer2} from '@angular/core';

export type ButtonType = 'primary' | 'secondary' | 'disabled';
export type ButtonSize = 'medium' | 'large';

@Component({
    selector: '[ac-button]',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.styl'],
})
export class ButtonComponent implements OnInit {
    constructor(private input: ElementRef, private renderer: Renderer2) {

    }

    private classMap = {};
    private _size: ButtonSize = 'medium';
    private _type: ButtonType = 'primary';
    private _shrink = false;
    _loading = false;

    @Input('ac-width') width: number;

    @Input('ac-size')
    set size(size: ButtonSize) {
        this._size = size || 'medium';
        this.setClass();
    }

    @Input('ac-type')
    set type(type: ButtonType) {
        this._type = type || 'primary';
        this.setClass();
    }

    @Input('ac-shrink')
    set shrink(shrink: boolean) {
        this._shrink = shrink;
        this.setClass();
    }

    @Input('ac-loading')
    set loading(loading: boolean) {
        this._loading = loading;
    }

    onClick(e: Event) {
        if (this._loading) {
            e.preventDefault();
            e.stopPropagation();
        }
    }

    setClass() {
        const oldClasses = Object.keys(this.classMap).filter((key) => !!this.classMap[key]);
        this.classMap = {
            [this._size]: true,
            [this._type]: true,
            shrink: this._shrink,
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
