Koala.views.add('stream_option', Backbone.View.extend({
	
	tagName: 'option',

	render: function() {
		this.$el.html(this.model.attributes.name);
		return this;
	}

}));