Koala.models.add('matchup', Backbone.Model.extend({
	urlRoot: '/api/matchups',

	defaults: {
		best_of: 3,
		teams: [
			{name: "TBA"},
			{name: "TBA"}
		],
		games: []
	},

	initialize: function() {
		this.games = Koala.collections.new('games', this.attributes.games);
		this.on('change:games', function() {
			this.games.update(this.attributes.games);
		});
	}
}));

