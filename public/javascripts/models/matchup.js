Koala.models.add('matchup', Backbone.Model.extend({
	urlRoot: '/api/matchups',
	defaults: {
		best_of: 3
	}
}));

