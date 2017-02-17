import gulp from 'gulp';
import project from '../aurelia.json';
import MarkdownIt from 'markdown-it';
import FrontMatter from 'front-matter';
import through from 'through2';
import vinyl from 'vinyl-fs';

const md = new MarkdownIt();

let postsMetadata = [];

export default gulp.series(
    processPosts
);
function writePostMetadata() {
    return vinyl.dest(project.postProcessor.output + '/metadata.json', JSON.stringify(postsMetadata));
}
function processPosts() {
    return gulp.src(project.postProcessor.source)
      .pipe(through.obj((file, enc, cb) => {
          let postMetadata = FrontMatter(file.contents.toString());
          let rendered = '<template>' + md.render(postMetadata.body) + '</template>';
          file.contents = new Buffer(rendered);
          file.path = file.path.slice(0, -2) + 'html';

          postsMetadata.push(postMetadata);

          cb(null, file);
      }))
      .pipe(gulp.dest(project.postProcessor.output));
}
