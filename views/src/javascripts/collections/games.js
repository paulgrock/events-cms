Koala.collections.add('games', Backbone.Collection.extend({
	model: Koala.models.get('game'),
	url: "/api/games"
}));

