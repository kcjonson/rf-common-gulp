#!/usr/bin/env node

/*
  Compile/Build src 
*/

var gulp = require('gulp');
require('../gulpfile.js')

console.log('Running scripts/build.js')

gulp.start('build');