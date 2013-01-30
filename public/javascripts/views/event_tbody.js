Koala.views.add('event_tbody', Backbone.View.extend({
	
	el: document.getElementById("eventsTable"),

	initialize: function() {
		this.listenTo(this.collection, 'add', this.addOne);
		this.listenTo(this.collection, 'reset', this.addAll);
	},

	addOne: function(model) {
		var view = Koala.views.new('event_tr', {model: model});
		this.$el.append(view.render().el);
	},

	addAll: function() {
		this.collection.each(this.addOne, this);
	}

}));

