var http = require('http');
var querystring = require('querystring');
var activity_logger = require('../lib/activity_logger');
var notifier = require('../lib/notifier');

var fetchContent = function(options, payload, cb) {
	var options = options || {};

	options.hostname 	= 'ec2-54-241-60-14.us-west-1.compute.amazonaws.com';
	//options.hostname   = 'esports.ign.com';
    options.port 		= 80;
	options.path 		= '/content/v2' + options.path;
	options.method 		= (options.method || 'GET').toUpperCase();

	if(options.method === "DELETE") {
		options.headers = {
			"Content-Type": "application/json, text/javascript",
			"Content-Length": payload.length,
			"Accept": "application/json, text/javascript"
		};
	}

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
        return false;
	});

	// write data to request body
	req.write(payload);
	req.end();

};


var formPath = function(req) {
	var path = '' + req.path.replace(/^\/api(.*)$/, '$1');
	var query = querystring.stringify(req.query);
	if(query) path += '?' + query;
	return path;
};

var fetchMatchupData = function(matchup_id, method, type){
    var req = http.get('http://esports.ign.com/content/v2/events.json?' + (new Date()).getTime(), function(res) {
        var chunks = '';

        res.on('data', function(chunk) {
            chunks += chunk;
        });

        res.on('end', function() {
            var chunkObj = JSON.parse(chunks);
            chunkObj.forEach(function(event){
                if(event.matchup.id === matchup_id) {
                    notifier.notify(method, type, JSON.stringify(event));
                }
            });
        });
    });
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
            if(req.params.type === 'events') {
                notifier.notify(req.method, req.params['type'], chunks);
                return;
            }
            if(req.params.type === 'games' && req.body.matchup_id) {
                fetchMatchupData(req.body.matchup_id, req.method, 'events');
                return;
            }
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
