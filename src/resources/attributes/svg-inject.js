import {inject, Loader} from 'aurelia-framework';

@inject(Element, Loader)
export class SvgInjectCustomAttribute {
    constructor(element, loader) {
        this.element = element;
        this.loader = loader;
        window.loader = this.loader;
    }

    valueChanged(newValue, oldValue) {
        this.loader.loadText(newValue + '.svg')
          .then(svgText => {
              console.log(svgText);
          });
    }
}

