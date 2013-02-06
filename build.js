// Koala JS Concatinator/Compressor

var fs = require("fs");
var path = require("path");
var UglifyJS = require("uglify-js");
var jade = require('jade');
var util = require('util');

var publicRootPath = "public/javascripts/";
var templatesPath = "views/templates/";
var subDirectories = ["models", "collections", "views"]; //Order is important
var watchers = [];

(function build(event, changedFileName) {
	var jsPile = "";
	//Clear all previous watchers
	while(watchers[0]) watchers.pop().close();

	var appendToPile = function(filePath) {
		var p = path.join(publicRootPath, filePath);
		jsPile += fs.readFileSync(p);
		watchers.push(fs.watch(p, build)); //Watch file for changes
	};

	if(!changedFileName && !event) {
		util.log("Building Koala public javascripts...");
	}
	else {
		util.log("Re-building Koala public javascripts...");
	}

	//Pre-compile all Jade Underscore templates -> Save to public/javascripts/templates
	var templates = fs.readdirSync(templatesPath);
	for(var i in templates) {
		var templatePath = path.join(templatesPath, templates[i]);
		var template = fs.readFileSync(templatePath);
		var compiled = jade.compile(template);
		fs.writeFileSync(path.join(publicRootPath, "templates", path.basename(templates[i], ".jade") + ".js"), compiled(null));
		watchers.push(fs.watch(templatePath, build));
	}

	appendToPile("koala.js"); //Start with base Koala.js

	//Cycle through each directory in order, appending each file to public/javascripts/koala-package.js
	for(var i in subDirectories) {
		var files = fs.readdirSync(path.join(publicRootPath,subDirectories[i]));
		for(var j in files) {
			appendToPile(path.join(subDirectories[i], files[j]));
		}
	}

	//Compress data with UglifyJS
	var compressedPile = jsPile;//UglifyJS.minify(jsPile, {fromString: true}).code;

	//Write compressed data to koala-package.js
	fs.writeFileSync(publicRootPath + "koala-package.js", compressedPile);

	util.log("done.");
})();




