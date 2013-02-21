Koala.collections.add('streams', Backbone.Collection.extend({
	model: Koala.models.get('stream'),
	url: "/api/streams"
}));