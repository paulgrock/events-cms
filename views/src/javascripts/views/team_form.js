Koala.views.add('team_form', Backbone.View.extend({

	tagName: 'fieldset',

	template: Koala.templates.get('team_form'),

	events: {
		"keyup .teamName_input" : "setName",
		"keyup .teamLogo_input" : "setLogo"
	},

	initialize: function() {
		this.team_image = Koala.views.new('team_image', {
			model: this.model
		});
	},

	render: function() {
		this.$el.html(this.template(this.model.attributes));
		$('.team_image', this.el).replaceWith(this.team_image.render().el);
		return this;
	},

	setName: function() {
		this.model.set('name', $('.teamName_input', this.el).val());
		this.save();
	},

	setLogo: function() {
		this.model.set('image_url', $('.teamLogo_input', this.el).val());
		this.save();
	},

	save: function() {
		if(this.model.isNew() || !this.model.hasChanged()) return;
		this.model.save();
	}

}));
