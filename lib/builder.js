// Koala builder.
// Concatinates all public MVC JS and compresses
// Concatinates all vendor JS and compresses
// Compiles all underscore Jade templates and saves them into public directory
// Watches files and directories of interest and recompiles automatically

var fs = require("fs");
var path = require("path");
var jade = require('jade');
var util = require('util');
var sourceJSRootPath = path.join(__dirname, "../views/src/javascripts/");
var templateWatchers = [];

//================================ Jade Template Compilation NS
(function compileJadeTemplates(event, fname) {
	var templatesPath = path.join(__dirname, "../views/src/templates/");

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
		fs.writeFileSync(path.join(sourceJSRootPath, "templates", basename + ".js"), compiled, "utf8");
		templateWatchers.push(fs.watch(templatePath, compileJadeTemplates));
	}
})();
