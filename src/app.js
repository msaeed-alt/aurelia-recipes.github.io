import {inject} from 'aurelia-framework';
import {I18N} from 'aurelia-i18n';

@inject(i18n)
export class App {
    router = null;

    constructor(i18n) {
        this.i18n = i18n;
    }

    configureRouter(config, router) {
        this.router = router;
        config.title = this.i18n.tr('site.name');
        config.map([
            {
                route: [''],
                name: 'construction',
                title: this.i18n.tr('navigation.construction'),
                moduleId: 'construction'
            },
            {
                route: ['home'],
                name: 'home',
                title: this.i18n.tr('navigation.home'),
                moduleId: 'home/home'
            },
            {
                route: 'recipes',
                name: 'recipes',
                title: this.i18n.tr('navigation.recipes'),
                moduleId: 'recipes/home',
                nav: true
            },
            {
                route: 'instructions',
                name: 'instructions',
                title: this.i18n.tr('navigation.instructions'),
                moduleId: 'instructions/home',
                nav: true
            },
            {
                route: 'source-code',
                name: 'source-code',
                title: this.i18n.tr('navigation.source-code'),
                moduleId: 'source-code/home',
                nav: true
            }
        ]);
    }
}
