Koala.views.add('team_typeahead', Backbone.View.extend({

	className: "team_typeahead",

	initialize: function() {
		this.input = Koala.views.new('team_input', {
			collection: this.collection,
			model: this.model
		});

		this.image = Koala.views.new('team_image', {
			model: this.model
		});

		this.$el.append(this.image.render().el);
		this.$el.append(this.input.render().el);
	},

	render: function() {
		this.image.render();
		this.input.render();
		return this;
	}

}));
