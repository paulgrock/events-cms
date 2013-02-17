// Koala builder.
// Concatinates all public MVC JS and compresses
// Compiles all underscore Jade templates and saves them into public directory
// Watches files and directories of interest and recompiles automatically

var fs = require("fs");
var path = require("path");
var UglifyJS = require("uglify-js");
var jade = require('jade');
var util = require('util');

var publicRootPath = "public/javascripts/";
var templatesPath = "views/templates/";
var subDirectories = ["templates", "models", "collections", "views"]; //Order is important
var templateWatchers = [];
var publicJSWatchers = [];

//Jade Template Compilation NS
(function compileJadeTemplates(event, fname) {
	if(!fname && !event) {
		util.log("Compiling Jade Underscore templates...");
	}
	else util.log("Re-building Jade Underscore templates...");

	while(templateWatchers[0]) templateWatchers.pop().close(); //Close old watchers

	var addPadding = function(key, t) {
		var str = "Koala.templates.add('";
			str += key;
			str += "', '";
			str += t.replace(/'/g, "\\'").replace(/[\n\r\t]/g, "");
			str += "');"
		return str;
	};

	var templates = fs.readdirSync(templatesPath);
	templateWatchers.push(fs.watch(templatesPath, compileJadeTemplates)); //Watch template dir
	for(var i in templates) {
		if(path.extname(templates[i]) !== ".jade") continue;

		var basename = path.basename(templates[i], ".jade");
		var templatePath = path.join(templatesPath, templates[i]);
		var template = fs.readFileSync(templatePath);
		var compiled = addPadding(basename, jade.compile(template)());
		fs.writeFileSync(path.join(publicRootPath, "templates", basename + ".js"), compiled, "utf8");
		templateWatchers.push(fs.watch(templatePath, compileJadeTemplates));
	}
})();

//Koala Models, Collections and Views Concatination NS
(function concatinatePublicJS(event, fname) {
	if(!fname && !event) {
		util.log("Building Koala public javascripts...");
	}
	else util.log("Re-building Koala public javascripts...");

	while(publicJSWatchers[0]) publicJSWatchers.pop().close(); //Close old watchers

	var jsPile = "";

	var appendToPile = function(filePath) {
		var p = path.join(publicRootPath, filePath);
		jsPile += fs.readFileSync(p);
		publicJSWatchers.push(fs.watch(p, concatinatePublicJS)); //Watch file for changes
	};

	//Add base Koala
	appendToPile("koala.js");

	//Cycle through each directory in order, appending each file to public/javascripts/koala-package.js
	for(var i in subDirectories) {
		var subDirectoryPath = path.join(publicRootPath,subDirectories[i]);
		var files = fs.readdirSync(subDirectoryPath);
		for(var j in files) {
			if(path.extname(files[j]) !== ".js") continue;

			appendToPile(path.join(subDirectories[i], files[j]));
		}
		publicJSWatchers.push(fs.watch(subDirectoryPath, concatinatePublicJS)); //Watch subdirectory
	}

	//Compress jsPile with UglifyJS
	var compressedPile = jsPile;//UglifyJS.minify(jsPile, {fromString: true}).code;

	//Write compressed data to koala-package.js
	fs.writeFileSync(path.join(publicRootPath, "koala-compiled.js"), compressedPile, "utf8");
})();



