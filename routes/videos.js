exports.list = function(req, res){
  res.render("videos", 
  	{
      id: "videos",
  		title: "Video Listing",
      filter: req.query.group,
      type: "Video",
      info: "Manage information relating to specific Videos."
  	});
};