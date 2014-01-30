'use strict';
var map = require('map-stream');
var es = require('event-stream');;
var gutil = require('gulp-util');

module.exports = function(data) {
  return es.map(function (file, cb) {
    var keyName = file.path.replace(/\.\w+$/,'');
    if ( file.contents ) {
       data[ keyName ] = file.contents.toString();
    }
//    console.log( data )
    cb(null,file);
  });
};

