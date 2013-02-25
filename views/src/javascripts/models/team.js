Koala.models.add('team', Backbone.Model.extend({
	urlRoot: '/api/teams',

	defaults: {
		name: "",
		image_url: ""
	}
}));
