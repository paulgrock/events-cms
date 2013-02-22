Koala.views.add('matchup_tr', Backbone.View.extend({
	
	tagName: 'tr',

	template: Koala.templates.get('matchup_tr'),

	initialize: function() {
		this.listenTo(this.model, "change", this.render);
		this.listenTo(this.model, "destroy", this.destroy);

		//Action Button
		this.actionButton = Koala.views.new('edit_delete_button', {
			type: "Matchup",
			href: "/matchups/" + this.model.get('id'),
			model: this.model
		});
	},

	render: function() {
		this.$el.html(this.template(this.model.attributes));
		$('.actionButton', this.el).append(this.actionButton.render().el);
		return this;
	},

	destroy: function() {
		this.remove();
	}

}));