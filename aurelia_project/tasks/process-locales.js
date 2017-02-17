import gulp from 'gulp';
import project from '../aurelia.json';
import through from 'through2';
import fs from 'fs';
import htmlparser from 'htmlparser2';

import translate from 'google-translate-api';

import enLocale from '../../locales/en/translation.json';
import frLocale from '../../locales/fr/translation.json';


export default gulp.series(
    getTranslations,
    writeLocales,
    processLocales
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
            let textKeys = new Set();
            let parser = new htmlparser.Parser({
                ontext: function(text) {
                    let strippedText = getTextOnlyContent(text);
                    if (strippedText.length > 0) {
                        textKeys.add(strippedText);
                    }
                }
            });
            parser.write(file.contents.toString());
            addTextToTranslationFiles(Array.from(textKeys));
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
            let localTranslation = JSON.parse(file.contents.toString());
            for (let key in localTranslation) {
                translationRequests.push(
                    translate(key, {from: 'en', to: 'fr'}).then(res => {
                        localTranslation[key] = res.text;
                    }).catch(err => {
                        console.error(err);
                    })
                );
            }
            file.contents = new Buffer(JSON.stringify(localTranslation, null, '\t'));
            Promise.all(translationRequests)
                .then(() => {
                    cb(null, file);
                });
        }))
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
