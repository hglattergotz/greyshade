#!/usr/bin/env node

var sass = require("node-sass");
var fs = require('fs');
var sassOptions = {
  file: "static/sass/screen.scss",
  outFile: "static/css/screen.css",
  outputStyle: "compressed",
  includePaths: [ "node_modules/compass-mixins/lib" ],
  functions: {
    // rewrite the image url to prepend /images/ to the path
    'image-url($img)': function(img) {
      return new sass.types.String('url("/images/' + img.getValue() + '")');
    }
  }
}; // options for node-sass

// These options are processed and returned as options that can be passed to any build tool
// that passes options through to node-sass.
sass.render(sassOptions, function(error, result) {
  if (error) {
    //handle the compilation error
    console.log(error);
  } else {
    fs.writeFile(sassOptions.outFile, result.css, function(err) {
      if(err) {
        return console.log(err);
      }

      console.log("The file was saved!");
    });
  }
});
