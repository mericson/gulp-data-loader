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


    var keyName = opt.stripExt ? file.path.replace(/\.\w+$/,'') : file.path;
    
    if ( opt.parseData ) {
      var ext = getExtension( file.path );
      console.log( ext );

      if ( ext === 'json' ) {
        data[ keyName ] = JSON.parse( file.contents.toString() );
      } else {
         data[ keyName ] = file.contents.toString();
      }


    } else {
      if ( file.contents ) {
         data[ keyName ] = file.contents.toString();
      }
    }

    console.log( data );

//    console.log( data )
    cb(null,file);
  });
};

