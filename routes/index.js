
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', {
  	id: 'home',
  	title: 'Home',
	breadcrumbs: [
		{title: "Home"}
	]
  });
};