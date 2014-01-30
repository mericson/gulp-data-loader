'use strict';
var map = require('map-stream');
var es = require('event-stream');;
var gutil = require('gulp-util');

module.exports = function(data, opt) {

  function getExtension(filename) {
      var ext = path.extname(filename||'').split('.');
      return ext[ext.length - 1];
  }


  if ( ! opt ) {
    opt = { stripExt: true, parseData: true }
  }

  return es.map(function (file, cb) {

    console.log( file.cwd )
    console.log( file.base )
    console.log( file.path )
    console.log( 'i started here')

    if ( file.contents ) {

    var keyName = opt.stripExt ? file.path.replace(/\.\w+$/,'') : file.path;
    console.log( 'now i am here')

         data[ keyName ] = file.contents.toString();

    console.log( 'i made it all the way here')
   }


    console.log( data );

//    console.log( data )
    cb(null,file);
  });
};

