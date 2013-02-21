Koala.views.add('links_ul', Backbone.View.extend({

	tagName: "ul",

	className: "pager",

	template: Koala.templates.get('links_ul'),

	initialize: function() {
		this.listenTo(this.model, "change", this.render);
	},

	render: function() {
		this.$el.html(this.template(this.model.attributes));
		return this;
	}

}));