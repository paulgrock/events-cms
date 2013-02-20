var http = require('http');
var querystring = require('querystring');
var activity_logger = require('../lib/activity_logger');

var fetchContent = function(options, payload, cb) {
	var options = options || {};

	options.hostname 	= 'esports.ign.com';
	options.port 		= 80;
	options.path 		= '/content/v2' + options.path;
	options.method 		= (options.method || 'GET').toUpperCase();

	var req = http.request(options, function(res) {
		var chunks = "";

		res.on('data', function(chunk) {
			chunks += chunk;
		});

		res.on('end', function() {
			cb(chunks, res.headers, res.statusCode);
		});
	});

	req.on('error', function(e) {
		cb();
	});

	// write data to request body
	req.write(payload);
	req.end();

	//console.log(options);
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
		method: req.route.method,
		headers: req.headers
	};

	//Express parses body to json, convert back to string
	var body = JSON.stringify(req.body);

	fetchContent(options, body, function(chunks, headers, status) {
		if(!status) {
			res.send();
			return;
		}
		res.set(headers);
		res.status(status);
		res.send(chunks);

		//Log
		if(options.method.toUpperCase() !== "GET") {
			activity_logger.append({
				ip: req.ip,
				endPoint: req.path,
				method: options.method.toUpperCase(),
				status: status
			});
		}

	});
};


//Exported Routes
exports.passThrough = passThrough;

exports.action = function(req, res) {
	//Do something
	passThrough(req, res);
	//res.send('');
};