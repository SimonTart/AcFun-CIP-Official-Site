import {Component} from '@angular/core';
import {AppBasePageComponent} from '../AppBasePage.component';

@Component({
    selector: 'app-browser-extension',
    templateUrl: './browser-extension.component.html',
    styleUrls: ['./browser-extension.component.styl']
})
export class BrowserExtensionComponent extends AppBasePageComponent {
    backgorundImageUrl = require('../../assets/images/pages/browser_extension.jpg');
    firefoxSvg = require('../../assets/images/pages/firefox.svg');
    chromeSvg = require('../../assets/images/pages/chrome.svg');
    crxSvg = require('../../assets/crx/acfun_cip_v2.1.0.crx');
    video = require('../../assets/videos/magic.mp4');

    title = 'A站评论补全计划插件（AcFun Comment Instrumentality Project Extension）';
}
