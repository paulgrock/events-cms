Koala.collections.add('groups', Backbone.Collection.extend({
	model: Koala.models.get('group'),
	url: "/api/groups"
}));