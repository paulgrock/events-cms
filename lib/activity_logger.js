var fs = require("fs");
var path = require("path");

var logPath = path.join(__dirname, '../activity-log.json');
var maxLength = 150;

//Init
var log = (function() {

    if(!fs.existsSync(logPath)) return [];

    var logData = fs.readFileSync(logPath);
    var logJSON;

    try {logJSON = JSON.parse(logData);}
    catch(err) {return [];}

    if(!logJSON instanceof Array) return [];

    while(logJSON.length > maxLength) logJSON.pop();

    return logJSON;

})();

exports.append = function(data, cb) {

	var newLog = {
		ts: 		new Date().getTime(),
		ip: 		data.ip || "-",
		endPoint: 	data.endPoint || "-",
		method: 	data.method || "-",
		status: 	data.status || "-" 
	};

	log.unshift(newLog);

	 while(log.length > maxLength) log.pop();

	fs.writeFile(logPath, JSON.stringify(log), "utf8", cb);

};

exports.retrieve = function() {
	return log;
};