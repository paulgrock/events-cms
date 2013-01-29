Koala.models.add('event', Backbone.Model.extend({
	urlRoot: '/api/events',
	defaults: {
		title: "",
		stream: "",
		starts_at: "",
		ends_at: "",
		matchup: null
	}
}));