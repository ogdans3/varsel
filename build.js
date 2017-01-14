var minifier = require('minifier');
var files = ["varsel.js", "varsel.css"];


console.log("Minifying files");
var template = "/dist/{{filename}}.min.{{ext}}";
for(var i = 0; i < files.length; i++){
    var result = minifier.generateOutputName(files[i], {template: template});
    console.log(files[i], "-->", result);
    minifier.minify(files[i], {output: result, clean: true});
}

minifier.on('error', function(err) {
    console.log("An error occured when we tried to minify a file");
    console.err(err);
})
