Koala.views.add('group_pill', Backbone.View.extend({
	
	tagName: 'li',

	template: Koala.templates.get('group_pill'),

	initialize: function() {
		var isActive = this.model.get('active');
		if(isActive) this.$el.addClass('active');
	},

	render: function() {
		var slug = this.model.get("slug");
		if(slug) this.model.set('href', location.pathname + "?group=" + this.model.get("slug"));
		else this.model.set('href', location.pathname);
		this.$el.html(this.template(this.model.attributes));
		return this;
	}

}));