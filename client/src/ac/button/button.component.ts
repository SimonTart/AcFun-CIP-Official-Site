import {Component, OnInit, Input} from '@angular/core';

export type ButtonType = 'primary' | 'secondary' | 'disabled';
export type ButtonSize = 'medium' | 'large';

@Component({
    selector: 'ac-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.styl']
})
export class ButtonComponent implements OnInit {

    constructor() {
    }

    private classMap;
    private _size: ButtonSize = 'medium';
    private _type: ButtonType = 'primary';
    private _shrink: boolean = false;

    @Input('ac-width') width:number;

    @Input('ac-size')
    set size(size: ButtonSize) {
        this._size = size || 'medium';
        this.setClassMap();
    }

    @Input('ac-type')
    set type(type: ButtonType) {
        this._type = type || 'primary';
        this.setClassMap();
    }

    @Input('ac-shrink')
    set shrink(shrink: boolean) {
        this._shrink = shrink;
        this.setClassMap();
    }


    setClassMap() {
        this.classMap = {
            [this._size]: true,
            [this._type]: true,
            shrink: this._shrink,
        };
    }

    ngOnInit() {
        this.setClassMap();
    }

}
