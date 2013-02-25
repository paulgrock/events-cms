Koala.collections.add('teams', Backbone.Collection.extend({
	model: Koala.models.get('team'),
	url: "/api/teams"
}));