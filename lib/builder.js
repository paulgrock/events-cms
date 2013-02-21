// Koala builder.
// Concatinates all public MVC JS and compresses
// Concatinates all vendor JS and compresses
// Compiles all underscore Jade templates and saves them into public directory
// Watches files and directories of interest and recompiles automatically

var fs = require("fs");
var path = require("path");
var jade = require('jade');
var util = require('util');
var UglifyJS = require("uglify-js");

var publicRootPath = path.join(__dirname, "../public/javascripts/");

var templateWatchers = [];
var publicJSWatchers = [];
var vendorJSWatchers = [];


var compressJS = function(uncompressed) {
	var str = "" + uncompressed;
	//return str;
	return UglifyJS.minify(str, {fromString: true}).code;
};

//Jade Template Compilation NS
(function compileJadeTemplates(event, fname) {
	if(!fname && !event) {
		util.log("Compiling Jade Underscore templates...");
	}
	else util.log("Re-building Jade Underscore templates...");

	while(templateWatchers[0]) templateWatchers.pop().close(); //Close old watchers

	var templatesPath = path.join(__dirname, "../views/templates/");

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
(function concatinateKoalaJS(event, fname) {
	if(!fname && !event) {
		util.log("Building Koala javascripts...");
	}
	else util.log("Re-building Koala javascripts...");

	while(publicJSWatchers[0]) publicJSWatchers.pop().close(); //Close old watchers

	var subDirectories = ["templates", "models", "collections", "views"]; //Order is important
	var jsPile = "";

	var appendToPile = function(filePath) {
		var p = path.join(publicRootPath, filePath);
		jsPile += compressJS(fs.readFileSync(p));
		publicJSWatchers.push(fs.watch(p, concatinateKoalaJS)); //Watch file for changes
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
		publicJSWatchers.push(fs.watch(subDirectoryPath, concatinateKoalaJS)); //Watch subdirectory
	}

	//Write compressed data to koala-package.js
	fs.writeFileSync(path.join(publicRootPath, "koala-compiled.js"), jsPile, "utf8");
})();

//Koala Vendor JS
(function concatinateVendorJS(event, fname) {
	var vendorRootPath = path.join(publicRootPath, "vendor");
	var jsPile = "";

	if(!fname && !event) {
		util.log("Building vendor javascripts...");
	}
	else util.log("Re-building vendor javascripts...");

	var appendToPile = function(filePath) {
		jsPile += compressJS(fs.readFileSync(filePath));
		vendorJSWatchers.push(fs.watch(filePath, concatinateVendorJS)); //Watch file for changes
	};

	var scanDirectory = function(dirPath) {
		var files = fs.readdirSync(dirPath);

		for(var i in files) {
			var filePath = path.join(dirPath, files[i]);
			var stats = fs.statSync(filePath);

			//If file is a directory, recursively call scanDirectory
			if(stats.isDirectory()) {
				if(i === "jquery" || i === "underscore") continue; //Ignore jQuery & underscore
				scanDirectory(filePath);
				continue;
			}

			//If file is a javascript file, add to pile
			if(path.extname(files[i]) === ".js") {
				appendToPile(filePath);
				continue;
			}
		}

		vendorJSWatchers.push(fs.watch(dirPath, concatinateVendorJS));//Watch directory for changes
	};

	scanDirectory(path.join(vendorRootPath, "jquery")); //Add jQuery before dependents
	scanDirectory(path.join(vendorRootPath, "underscore")); //Add underscore before dependents
	scanDirectory(vendorRootPath); //Start with root vendor directory

	fs.writeFileSync(path.join(publicRootPath, "vendor-compiled.js"), jsPile, "utf8");
})();



