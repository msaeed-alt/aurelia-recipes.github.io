import {inject} from 'aurelia-framework';

export class App {
    router = null;

    constructor() {
    }

    configureRouter(config, router) {
        this.router = router;
        config.title = 'Recipe Book';
        config.map([
            {
                route: [''],
                name: 'construction',
                title: 'Under Construction',
                moduleId: 'construction'
            },
            {
                route: ['home'],
                name: 'home',
                title: 'Recipe Book',
                moduleId: 'home/home'
            },
            {
                route: 'recipes',
                name: 'recipes',
                title: 'Recipes',
                moduleId: 'recipes/home',
                nav: true
            },
            {
                route: 'instructions',
                name: 'instructions',
                title: 'Instructions',
                moduleId: 'instructions/home',
                nav: true
            },
            {
                route: 'source-code',
                name: 'source-code',
                title: 'Source Code',
                moduleId: 'source-code/home',
                nav: true
            }
        ]);
    }
}
