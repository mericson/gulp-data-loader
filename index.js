'use strict';
var map = require('map-stream');
var es = require('event-stream');;
var gutil = require('gulp-util');
var path = require("path");

module.exports = function(data, opt) {

  function getExtension(filename) {
      var ext = path.extname(filename||'').split('.');
      return ext[ext.length - 1];
  }


  if ( ! opt ) {
    opt = { stripExt: true, parseData: true }
  }

  return es.map(function (file, cb) {

    if ( file.contents ) {

    var keyName = file.path.replace( file.base, '' )
    var keyName = opt.stripExt ? keyName.replace(/\.\w+$/,'') : keyName;

    gutil.log( 'Loading ' + gutil.colors.cyan(file.path)+' to ', gutil.colors.magenta(keyName));

    if ( opt.parseData ) {

      var ext = getExtension( file.path );

      if ( ext == 'json' ) {        
        data[ keyName ] = JSON.parse( file.contents.toString() );
      } else {
         data[ keyName ] = file.contents.toString();
      }

    } else {
         data[ keyName ] = file.contents.toString();
    }
   }
    cb(null,file);
  });
};

