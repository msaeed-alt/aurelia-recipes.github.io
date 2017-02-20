import environment from './environment';
import {I18N, Backend} from 'aurelia-i18n';

//Configure Bluebird Promises.
//Note: You may want to use environment-specific configuration.
Promise.config({
  warnings: {
    wForgottenReturn: false
  }
});

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources')
    .plugin('aurelia-i18n', (instance) => {
        // register backend plugin
        window.i18n = instance;
        instance.i18next.use(Backend.with(aurelia.loader));
        // adapt options to your needs (see http://i18next.com/docs/options/)
        // make sure to return the promise of the setup method, in order to guarantee proper loading
        return instance.setup({
            backend: {                                  // <-- configure backend settings
                loadPath: '/locales/{{lng}}/{{ns}}.json', // <-- XHR settings for where to get the files from
            },
            lng: 'en',
            attributes: ['t','i18n'],
            fallbackLng: 'en',
            debug: true
        });
    });

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => aurelia.setRoot());
}
