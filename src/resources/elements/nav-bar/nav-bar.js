import {inject, bindable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

import {I18N} from 'aurelia-i18n';

@inject(i18n, EventAggregator)
export class NavBar {
    @bindable router;

    constructor(i18n, ea) {
        this.i18n = i18n;
        this.ea = ea;

        ea.subscribe('i18n:locale:changed', payload => {
            this.i18n.updateTranslations(this.element);
        });
    }

    bind() {

    }

}

