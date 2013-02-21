Koala.models.add('team', Backbone.Model.extend({
	urlRoot: '/api/teams',

	defaults: {
		image_url: ""
	}
}));
