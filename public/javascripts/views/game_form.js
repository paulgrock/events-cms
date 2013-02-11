Koala.views.add('game_form', Backbone.View.extend({

	tagName: 'fieldset',

	template: Koala.templates.get('game_form'),

	initialize: function(options) {
		this.listenTo(this.collection, 'add', this.addOne);
		this.listenTo(this.collection, 'reset', this.addAll);
		this.matchup = options.matchup;
	},

	render: function() {
		this.$el.html(this.template());
	},

	addOne: function(model) {
		var view = Koala.views.new('game_field', {model: model});
		this.$el.append(view.render().el);
	},

	addAll: function() {
		this.collection.each(this.addOne, this);
	}

}));