Koala.collections.add('matchups', Backbone.Collection.extend({
	model: Koala.models.get('matchup'),
	url: "/api/matchups"
}));

