import gulp from 'gulp';
import project from '../aurelia.json';

import scanner from 'i18next-scanner';


export default gulp.series(
    parseTranslations
);

function parseTranslations() {
    return gulp.src('src/**/*.{js,html}')
        // .pipe(through.obj((file, enc, cb) => {
        //     parser.parseAttrFromString(file.contents.toString(), {
        //         list: ['i18n']
        //     }, function(key) {
        //         let defaultValue = key; // use key as the value
        //         parser.set(key, defaultValue);
        //     });
        //     parser.parseFuncFromString(file.contents.toString(), {
        //         list: ['this.i18n.tr']
        //     }, function(key) {
        //         let defaultValue = key; // use key as the value
        //         parser.set(key, defaultValue);
        //     });

        //     let locale = JSON.stringify(parser.get({
        //         sort: true,
        //         lng: 'en'
        //     }));
        //     console.log(locale);

        //     cb(null, file);
        // }));
        .pipe(scanner({
            sort: true,
            removeUnusedKeys: true,
            defaultValue: '__NEEDS_TRANSLATION__',
            lngs: ['en', 'fr'], // supported languages
            attr: {
                list: ['i18n', 't']
            },
            func: {
                list: ['this.i18n.tr']
            },
            resource: {
                // the source path is relative to current working directory
                loadPath: '../../locales/{{lng}}/{{ns}}.json',

                // the destination path is relative to your `gulp.dest()` path
                savePath: '../../locales/{{lng}}/toTranslate_{{ns}}.json'
            }
        }));
        //.pipe(gulp.dest('wwwroot/locales'));
}

