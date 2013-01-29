exports.list = function(req, res){
  res.render('matchups', 
  	{
      id: 'matchups',
  		title: 'Matchup Listing',
  		breadcrumbs: [
  			{title: "Home", url: "/"},
  			{title: "Matchups"}
  		],
      filter: req.query.group,
      type: "Matchup"
  	});
};

exports.edit = function(req, res){
  res.render('matchups', { title: 'Matchups' });
};