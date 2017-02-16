import gulp from 'gulp';
import project from '../aurelia.json';
import MarkdownIt from 'markdown-it';
import {build} from 'aurelia-cli';
import through from 'through2';

const md = new MarkdownIt();

export default function processMarkdown() {
    return gulp.src(project.markdownProcessor.source)
      .pipe(through.obj((file, enc, cb) => {
          let rendered = `<template>${md.render(file.contents.toString())}</template>`;
          file.contents = new Buffer(rendered);
          file.path = file.path.slice(0, -2) + 'html';
          cb(null, file);
      }))
      .pipe(build.bundle());
}
