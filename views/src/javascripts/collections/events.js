Koala.collections.add('events', Backbone.Collection.extend({
	model: Koala.models.get('event'),
	url: "/api/events"
}));