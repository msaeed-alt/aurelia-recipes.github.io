import gulp from 'gulp';
import transpile from './transpile';
import processMarkup from './process-markup';
import processMarkdown from './process-markdown';
import processSVG from './process-images';
import processCSS from './process-css';
import {build} from 'aurelia-cli';
import project from '../aurelia.json';

export default gulp.series(
  readProjectConfiguration,
  gulp.parallel(
    transpile,
    processMarkup,
    processMarkdown,
    processSVG,
    processCSS
  ),
  writeBundles
);

function readProjectConfiguration() {
  return build.src(project);
}

function writeBundles() {
  return build.dest();
}
