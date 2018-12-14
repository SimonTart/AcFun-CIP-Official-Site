import {Component} from '@angular/core';
import {AppBasePageComponent} from '../AppBasePage.component';

@Component({
    selector: 'app-browser-extension',
    templateUrl: './browser-extension.component.html',
    styleUrls: ['./browser-extension.component.styl']
})
export class BrowserExtensionComponent extends AppBasePageComponent {
    backgorundImageUrl = 'assets/images/pages/browser_extension.jpg';
    title = 'A站评论补全计划插件（AcFun Comment Instrumentality Project Extension）';
}
