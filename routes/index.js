var activity_logger = require("../lib/activity_logger");

exports.index = function(req, res){
  res.render('index', {
  	id: 'activity',
  	title: 'Activity List',
	breadcrumbs: [
		{title: "Activity"}
	],
	type: "Log",
	info: "Showing the latest activity on Koala.",
	logs: activity_logger.retrieve()
  });
};