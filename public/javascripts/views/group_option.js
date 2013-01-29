Koala.views.add('group_option', Backbone.View.extend({
	
	tagName: 'option',

	render: function() {
		this.$el.html(this.model.attributes.name);
		return this;
	}

}));