import environment from './environment';
import {I18N, Backend} from 'aurelia-i18n';
//import Cache from 'i18next-localstorage-cache';
import LngDetector from 'i18next-browser-languagedetector';



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
          instance.i18next
            .use(Backend.with(aurelia.loader))
            //.use(Cache)
            .use(LngDetector)
            .init({
                cache: {
                    // turn on or off
                    enabled: false,

                    // prefix for stored languages
                    prefix: 'i18next_res_',

                    // expiration
                    expirationTime: 7 * 24 * 60 * 60 * 1000
                },
                detection: {
                    // order and from where user language should be detected
                    order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],

                    // keys or params to lookup language from
                    lookupQuerystring: 'lng',
                    lookupCookie: 'i18next',
                    lookupLocalStorage: 'i18nextLng',

                    // cache user language on
                    caches: ['localStorage', 'cookie'],

                    // optional expire and domain for set cookie
                    cookieMinutes: 10,
                    cookieDomain: 'myDomain',

                    // optional htmlTag with lang attribute, the default is:
                    htmlTag: document.documentElement
                }
            });
          // adapt options to your needs (see http://i18next.com/docs/options/)
          // make sure to return the promise of the setup method, in order to guarantee proper loading
          return instance.setup({
              backend: {                                  // <-- configure backend settings
                  loadPath: '/locales/{{lng}}/{{ns}}.json' // <-- XHR settings for where to get the files from
              },
              lng: 'en',
              attributes: ['t', 'i18n'],
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
