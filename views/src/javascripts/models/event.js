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

		//Set matchup values when event values change from external source
		this.on("change:matchup", function() {
			this.matchup.set(this.get('matchup'));
		});

		//Set values on matchup change
		this.listenTo(this.matchup, "change", function() {
			this.set({matchup: this.matchup.attributes}, {silent: true});
		});

		//Set default values
		this.set({matchup: this.matchup.attributes}, {silent:true});
	}

}));