export default class BasePage {
    set backgorundImageUrl(url: string | null) {
        const bgNode: HTMLElement  = document.querySelector('#bg');
        if (url) {
            bgNode.setAttribute('src', url);
            bgNode.style.display='block';
        } else {
            bgNode.setAttribute('src', '');
            bgNode.style.display='none';
        }
    }
}
