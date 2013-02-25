exports.list = function(req, res){
  res.render("teams", 
  	{
      id: "teams",
  		title: "Team Listing",
      filter: req.query.group,
      type: "Team",
      info: "Manage information relating to specific Teams."
  	});
};

exports.edit = function(req, res){
  var team_id = req.params.team_id;
  
  res.render("teams-edit", 
    {
      id: "team_edit",
      title: "Edit Team",
      back: "/teams",
      type: "Team",
      team_id: team_id
    });
};

exports.new = function(req, res) {
  res.render("teams-new", 
    {
      id: "team_new",
      title: "Create Team",
      back: "/teams"
    });
}