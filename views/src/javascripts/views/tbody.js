Koala.views.add('tbody', Backbone.View.extend({
	
	tagName: "tbody",

	initialize: function(options) {
		this.listenTo(this.collection, 'add', this.addOne);
		this.listenTo(this.collection, 'reset', this.addAll);
		this.rowView = options.rowView;
	},

	addOne: function(model) {
		var view = Koala.views.new(this.rowView, {model: model});
		this.$el.append(view.render().el);
	},

	addAll: function() {
		this.collection.each(this.addOne, this);
	}

}));

