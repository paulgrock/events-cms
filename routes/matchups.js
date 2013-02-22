exports.list = function(req, res){
  res.render("matchups", 
  	{
      id: "matchups",
  		title: "Matchup Listing",
      filter: req.query.group,
      type: "Matchup",
      info: "Information relating to specific Matchups, including Games."
  	});
};

exports.edit = function(req, res){
  var matchup_id = req.params.matchup_id;
  
  res.render("matchups-edit", 
    {
      id: "matchup_edit",
      title: "Edit Matchup",
      back: "/matchups",
      type: "Matchup",
      matchup_id: matchup_id
    });
};

exports.new = function(req, res) {
  res.render("matchups-new", 
    {
      id: "matchup_new",
      title: "Create Matchup",
      back: "/matchups"
    });
}