import gulp from 'gulp';
import transpile from './transpile';
import processMarkup from './process-markup';
import processPosts from './process-posts';
import processSVG from './process-images';
import processCSS from './process-css';
import {build} from 'aurelia-cli';
import project from '../aurelia.json';

export default gulp.series(
  readProjectConfiguration,
  gulp.parallel(
    transpile,
    processMarkup,
    processPosts,
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
