var activity_logger = require("../lib/activity_logger");

exports.index = function(req, res){
  res.render('index', {
  	id: 'activity',
  	title: 'Activity List',
	type: "Log",
	info: "Showing all recent activity.",
	logs: activity_logger.retrieve()
  });
};