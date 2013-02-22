Koala.views.add('game_table', Backbone.View.extend({

	tagName: "table",

	className: "table table-hover",

	template: Koala.templates.get('game_table'),

	initialize: function(options) {
		this.$el.html(this.template());
		this.listenTo(this.collection, 'add', this.addOne);
		this.listenTo(this.collection, 'reset', this.addAll);
		this.matchup = options.matchup;
	},

	addOne: function(model) {
		var view = Koala.views.new('game_tr', {
			model: model,
			matchup: this.matchup
		});
		$('tbody', this.el).append(view.render().el);
	},

	addAll: function() {
		this.collection.each(this.addOne, this);
	}

}));