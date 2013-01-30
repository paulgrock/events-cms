var http = require('http');
var querystring = require('querystring');

var fetchContent = function(options, payload, cb) {
	var options = options || {};

	options.hostname 	= 'esports.ign.com';
	options.port 		= 80;
	options.path 		= '/content/v2' + options.path;
	options.method 		= options.method || 'GET'
	//options.method 		= 'GET'; //Override while developing

	var req = http.request(options, function(res) {
		var chunks = "";

		res.on('data', function(chunk) {
			chunks += chunk;
		});

		res.on('end', function() {
			cb(chunks, res.headers);
		});
	});

	req.on('error', function(e) {
		cb();
	});

	// write data to request body
	req.write(payload);
	req.end();

	console.log(options);
};


var formPath = function(req) {
	var path = '' + req.path.replace(/^\/api(.*)$/, '$1');
	var query = querystring.stringify(req.query);
	if(query) path += '?' + query;
	return path;
};


var passThrough = function(req, res) {
	var options = {
		path: formPath(req),
		method: req.route.method
	};

	//Express parses body to json, convert back to string
	var body = JSON.stringify(req.body);

	fetchContent(options, body, function(chunks, headers) {
		res.set(headers);
		res.send(chunks);
	});
};


//Exported Routes
exports.passThrough = passThrough;

exports.action = function(req, res) {
	//Do something
	passThrough(req, res);
	//res.send('');
};