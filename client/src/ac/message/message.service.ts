import {ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector, Optional, Type} from '@angular/core';
import {MessageContainerComponent} from './message-container.component';

@Injectable({
    providedIn: 'root'
})
export class MessageService {

    private container: MessageContainerComponent;
    constructor(
        private injector: Injector,
        private cfr: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        // messageContainer: MessageContainerComponent,
    ) {
        this.container = this.createContainer();
    }

    create({ type, content }) {
        console.log('create');
        this.container.createMessage({ type, content });
    }

    private createContainer() {
        const componentRef = this.cfr.resolveComponentFactory(MessageContainerComponent).create(this.injector);
        this.appRef.attachView(componentRef.hostView);
        const domEl = (componentRef.hostView as EmbeddedViewRef<MessageContainerComponent>).rootNodes[0] as HTMLElement;
        document.body.append(domEl);
        return componentRef.instance;
    }
}
