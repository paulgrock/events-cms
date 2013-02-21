Koala.views.add('warning', Backbone.View.extend({
	className: 'alert',

	template: Koala.templates.get('warning'),

	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
		this.render();
	},

	render: function() {
		if(this.model.attributes.header === '') this.$el.hide();
		else this.$el.show();

		this.$el.html(this.template(this.model.attributes));
	}
}));