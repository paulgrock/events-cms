exports.list = function(req, res){
  res.render("listing", 
  	{
      id: "teams",
  		title: "Team Listing",
  		breadcrumbs: [
  			{title: "Home", url: "/"},
  			{title: "Teams"}
  		],
      filter: req.query.group,
      type: "Team",
      info: "Information relating to specific Teams."
  	});
};

exports.edit = function(req, res){
  var team_id = req.params.team_id;
  
  res.render("teams-edit", 
    {
      id: "team_edit",
      title: "Edit Team",
      breadcrumbs: [
        {title: "Home",url: "/"},
        {title: "Teams",url: "/teams"},
        {title: "Edit Team"}
      ],
      team_id: team_id
    });
};

exports.new = function(req, res) {
  res.render("teams-new", 
    {
      id: "team_new",
      title: "Create Team",
      breadcrumbs: [
        {title: "Home",url: "/"},
        {title: "Teams",url: "/teams"},
        {title: "Create Team"}
      ]
    });
}