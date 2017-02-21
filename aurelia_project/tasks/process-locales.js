import gulp from 'gulp';
import project from '../aurelia.json';
import through from 'through2';
import fs from 'fs';
//import htmlparser from 'htmlparser2';
import jsdom from 'jsdom';

import translate from 'google-translate-api';

import enLocale from '../../locales/en/translation.json';
import frLocale from '../../locales/fr/translation.json';


export default gulp.series(
    getPhrases,
    writeToLocaleFiles,
    translateLocales
);

//Executions
function getPhrases() {
    //TODO: loop through bundles and only get html that is in a bundle
    // let htmlSources = [];
    // for (let i = 0; i < project.build.bundles.length; i++) {
    //     let bundle = project.build.bundles[i];
    //     if (Array.isArray(bundle.source)) {
    //         htmlSources.concat(bundle.source.map(source => {
    //             //For right now, we're just pulling out text from html files

    //         }));
    //     }
    // }

    //For right now, we'll just get all the html in the src
    return gulp.src(project.localeProcessor.translate)
        .pipe(through.obj((file, enc, cb) => {
            let promise = new Promise((resolve, reject) => {
                jsdom.env(
                    `<html><body>${file.contents.toString()}</body></html>`, //Wrapping in html/body for fragments to be loaded
                    function(err, window) {
                        if (err) {
                            console.log('Trouble making the window for scraping');
                            console.log(err);
                        }
                        //Create "Template" in body
                        let textKeys = {};

                        let t = window.document.querySelector('template');
                        let tInstance = window.document.importNode(t.content, true);
                        window.document.body.appendChild(tInstance);

                        //Strange bug with querySelectorAll and passing multiple selectors. So we're going to make two seperate calls
                        let i18nElements = window.document.querySelectorAll('[i18n]');
                        //let tElements = window.document.querySelectorAll('[t]'); //Bug exists with the `t` attribute currently (https://github.com/tmpvar/jsdom/issues/1740)
                        let elementsToTranslate = i18nElements;//.concat(tElements); //Concat once we get the bug fixed

                        if (elementsToTranslate.length > 0) {
                            for (let elem of elementsToTranslate) {
                                let i18nKey = elem.getAttribute('i18n');
                                let tKey = elem.getAttribute('t');
                                let translationKey = tKey || i18nKey;
                                let translationKeys = translationKey.split(';');

                                translationKeys.forEach(key => {
                                    //If we have an `[html]` modifier, then lets get the innerHTML
                                    //Types:
                                    // [text]: Sets the textContent property (default)
                                    // [html]: Sets the innerHTML property
                                    // [append]: appends the translation to the current content already present in the element (allows html).
                                    // [prepend]: prepends the translation to the current content already present in the element (allows html).
                                    //Additional Types:
                                    // [placeholder]: Sets the placeholder property
                                    let currentElemText;

                                    let modifierRegex = /\[([^)]+)\]/;
                                    let modifierType = modifierRegex.exec(key);

                                    if (modifierType && modifierType[1] !== 'text') {
                                        switch (modifierType[1]) {
                                            case 'placeholder':
                                                currentElemText = elem.getAttribute('placeholder');
                                                key = key.replace(modifierRegex, '');
                                                break;
                                            case 'title':
                                                currentElemText = elem.getAttribute('title');
                                                key = key.replace(modifierRegex, '');
                                                break;
                                            default:
                                                currentElemText = elem.innerHTML.trim();
                                                key = key.replace(modifierRegex, '');
                                        }
                                    } else {
                                        currentElemText = elem.textContent;
                                    }

                                    setTranslationKey(key, currentElemText, textKeys);
                                });
                            }
                        }
                        addTextToTranslationFiles(textKeys);
                        window.close(); //Helps with memory collection
                        resolve();
                    });
            });
            return promise.then(() => {
                cb(null, file);
            });
        }));
}
function writeToLocaleFiles(cb) {
    //Writes new locale info to source local folder
    return fs.writeFile('locales/fr/translation.json', JSON.stringify(frLocale, null, '\t'), () => {
        return fs.writeFile('locales/en/translation.json', JSON.stringify(enLocale, null, '\t'), cb);
    });
}
function translateLocales() {
    //Translates locale info and writes translations to source and output locales
    return gulp.src(project.localeProcessor.source)
        .pipe(through.obj((file, enc, cb) => {
            let translationRequests = [];
            let localeTranslation = JSON.parse(file.contents.toString());
            //If not english, translate
            if (file.dirname.split('/').pop() !== 'en') {
                //Go through each property and translate
                traverse(localeTranslation, function(key, value, dotKey) { //TODO: `value` here is only a copy to the original. Would be much better if it were a reference
                    if (typeof value === 'string') {
                        //No way to detect if we have already translated, so blanket translation
                        translationRequests.push(
                            translate(value, {from: 'en', to: 'fr'}).then(res => {
                                //localeTranslation[key] = res.text;
                                setTranslationKey(dotKey, res.text, localeTranslation, true);
                            }).catch(err => {
                                console.error(err);
                            })
                        );
                    }
                });
            }

            Promise.all(translationRequests)
                .then(() => {
                    file.contents = new Buffer(JSON.stringify(localeTranslation, null, '\t'));
                    cb(null, file);
                });
        }))
        .pipe(gulp.dest('locales/'))
        .pipe(gulp.dest(project.localeProcessor.output));
}

//Utility functions
function addTextToTranslationFiles(textKeys) {
    deepExtend(frLocale, textKeys);
    deepExtend(enLocale, textKeys);
}
function setTranslationKey(key, value, keys, silent = false) { // "home.title.foo", "title.foo", "foo"
    //Used to set the translation key deep in the locale object
    let keyParts = key.split('.');
    if (keyParts.length === 1) { //End of the line
        if (keys[key] && !silent) {
            console.log(`Duplicate translation key (${key}) found. Last in wins.`);
        }
        return keys[key] = value;
    }

    if (!keys[keyParts[0]]) {
        keys[keyParts[0]] = {};
    }
    setTranslationKey(keyParts.slice(1, keyParts.length).join('.'), value, keys[keyParts[0]], silent);
}
function deepExtend(out) {
    out = out || {};

    for (let i = 1; i < arguments.length; i++) {
        let obj = arguments[i];

        if (!obj) {
            continue;
        }

        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (typeof obj[key] === 'object') {
                    out[key] = deepExtend(out[key], obj[key]);
                } else {
                    if (out[key]) {
                        console.log(`Duplicate translation key (${key}) found while extending. Last in wins.`);
                    }
                    out[key] = obj[key];
                }
            }
        }
    }

    return out;
}
function traverse(obj, func, passedDotKey = '') {
    for (let key in obj) {
        let dotKey = passedDotKey.length === 0 ? (passedDotKey + `${key}`) : (passedDotKey + `.${key}`);
        func.apply(this, [key, obj[key], dotKey]);
        if (obj[key] !== null && typeof(obj[key]) === 'object') {
            //going on step down in the object tree!!
            traverse(obj[key], func, dotKey);
        }
    }
}
