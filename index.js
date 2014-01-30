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

    console.log( file.cwd )
    console.log( file.base )
    console.log( file.path )
    console.log( 'i started here')

    if ( file.contents ) {

    var keyName = opt.stripExt ? file.path.replace(/\.\w+$/,'') : file.path;
    console.log( 'now i am here')

    if ( opt.parseData ) {
      console.log( 'now i am parsing data here')

      var ext = getExtension( file.path );
      console.log( ext );

      if ( ext == 'json' ) {        
        console.log( 'start json parse')

        data[ keyName ] = JSON.parse( file.contents.toString() );
        console.log( 'end json parse')

      } else {
                console.log( 'somewhere else json parse')

         data[ keyName ] = file.contents.toString();
      }


    } else {
            console.log( 'now i am not parsing data here')

         data[ keyName ] = file.contents.toString();
    }
    console.log( 'i made it all the way here')
   }


    console.log( data );

//    console.log( data )
    cb(null,file);
  });
};

