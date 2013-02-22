exports.list = function(req, res){
  res.render("events", 
  	{
      id: "events",
  		title: "Event Listing",
      filter: req.query.group,
      type: "Event",
      info: "Information relating to specific Events, including Matchups and Games."
  	});
};

exports.edit = function(req, res){
  var event_id = req.params.event_id;
  
  res.render('events-edit', 
  	{
      id: "event_edit",
  		title: "Edit Event",
  		back: "/events",
      type: "Event",
      event_id: event_id
  	});
};

exports.new = function(req, res) {
  res.render("events-new", 
    {
      id: "event_new",
      title: "Create Event",
      back: "/events"
    });
}