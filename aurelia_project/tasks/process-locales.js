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
    getTranslations//,
    //writeLocales,
    //processLocales
);

function getTranslations() {
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
            //get text from file
            //place text as keys in locale
            // let textKeys = new Set();
            // let parser = new htmlparser.Parser({
            //     ontext: function(text) {
            //         let strippedText = getTextOnlyContent(text);
            //         if (strippedText.length > 0) {
            //             textKeys.add(strippedText);
            //         }
            //     },
            //     onattribute: function(attribute, value) {
            //         console.log(attribute);
            //     }
            // });
            // parser.write(file.contents.toString());
            // addTextToTranslationFiles(Array.from(textKeys));
            let textKeys = new Map();
            let test = jsdom.env(
                `<html><body>${file.contents.toString()}</body></html>`, //Wrapping in html/body for fragments to be loaded
                function(err, window) {
                    if (err) {
                        console.log('Trouble making the window for scraping');
                        console.log(err);
                    }
                    //Create "Template" in body
                    let t = window.document.querySelector('template');
                    let tInstance = window.document.importNode(t.content, true);
                    window.document.body.appendChild(tInstance);

                    let i18nElements = window.document.querySelectorAll('[i18n]', '[t]');
                    if (i18nElements.length > 0) {
                        for (let elem of i18nElements) {
                            let i18nKey = elem.getAttribute('i18n');
                            let tKey = elem.getAttribute('t');
                            let translationKey = tKey || i18nKey;

                            let currentElemText = elem.textContent;

                            setTranslationKey(translationKey, currentElemText, textKeys);
                        }
                    }

                    console.log(textKeys);
                    window.close();
                });


            cb(null, file);
        }));
}
function writeLocales(cb) {
    return fs.writeFile('locales/fr/translation.json', JSON.stringify(frLocale, null, '\t'), cb);
}
function processLocales() {
    return gulp.src(project.localeProcessor.source)
        .pipe(through.obj((file, enc, cb) => {
            let translationRequests = [];
            let localeTranslation = JSON.parse(file.contents.toString());
            for (let key in localeTranslation) {
                if (key === localeTranslation[key]) {
                    //If we haven't translated
                    translationRequests.push(
                        translate(key, {from: 'en', to: 'fr'}).then(res => {
                            localeTranslation[key] = res.text;
                        }).catch(err => {
                            console.error(err);
                        })
                    );
                }
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

function getTextOnlyContent(text) {
    let trimmedText = text.trim();
    //Get rid of any special characters;
    //If first character is string interpolation, then next that portion
    return trimmedText;
}
function addTextToTranslationFiles(textKeys) {
    for (let key of textKeys) {
        if (!frLocale[key]) {
            frLocale[key] = key; //Key(en) : Translation(en by default)
        }
    }
}
function setTranslationKey(key, value, keys) {

}