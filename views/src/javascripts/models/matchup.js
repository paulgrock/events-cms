Koala.models.add('matchup', Backbone.Model.extend({
	urlRoot: '/api/matchups',

	defaults: {
		best_of: 3,
		teams: [null, null],
		games: []
	},

	initialize: function() {
		//Games
		this.games = Koala.collections.new('games', this.attributes.games);

		this.on('change:games', function() {
			this.games.update(this.attributes.games);
		});


		//Teams
		this.teamA = Koala.models.new('team', this.get('teams')[0]);
		this.teamB = Koala.models.new('team', this.get('teams')[1]);

		this.on('change:teams', function() {
			this.teamA.set(this.get('teams')[0], {silent: true});
			this.teamB.set(this.get('teams')[1], {silent: true});
		});

		this.listenTo(this.teamA, 'change', this.setTeams);
		this.listenTo(this.teamB, 'change', this.setTeams);
	},

	setTeams: function() {
		var teams = [];
		teams.push(this.teamA.attributes);
		teams.push(this.teamB.attributes);
		this.set({teams: teams});
	}
}));

