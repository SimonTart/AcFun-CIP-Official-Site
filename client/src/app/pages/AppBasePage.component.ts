import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
    template: '',
})
export default class AppBasePageComponent {
    constructor(public titleService: Title) {
    }

    private defaultTitle = 'A站评论补全计划(AcFun Comment Instrumentality Project)';

    set backgorundImageUrl(url: string | null) {
        const bgNode: HTMLElement = document.getElementById('bg');
        if (url) {
            bgNode.setAttribute('src', url);
            bgNode.style.display = 'block';
        } else {
            bgNode.setAttribute('src', '');
            bgNode.style.display = 'none';
        }
    }

    set title(title: string) {
        this.titleService.setTitle(title || this.defaultTitle);
    }
}
