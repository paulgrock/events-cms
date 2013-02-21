Koala.views.add('group_option', Backbone.View.extend({
	
	tagName: 'option',

	render: function() {
		this.el.text = this.model.attributes.name;
		this.el.value = this.model.attributes.id;
		return this;
	}

}));