Koala.models.add('event', Backbone.Model.extend({

	urlRoot: '/api/events',

	defaults: {
		title: "",
		stream: "",
		groups: null,
		starts_at: "",
		ends_at: "",
		matchup: null
	},

	initialize: function() {
		this.matchup = Koala.models.new('matchup', this.get('matchup'));

		this.on("change:matchup", function() {
			this.matchup.set(this.get('matchup'));
		});

		this.listenTo(this.matchup, "change", function() {
			this.set({matchup: this.matchup.attributes}, {silent: true});
		});
	}

}));