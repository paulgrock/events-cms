Koala.views.add('events_table', Backbone.View.extend({

	tagName: "table",

	template: Koala.templates.get('events_table'),
	
	className: "table table-hover",

	initialize: function() {
		var Collection = Koala.collections.new('events');
		this.tbody = Koala.views.new('tbody', {
			collection: Collection,
			rowView: 'event_tr'
		});

		Collection.fetch({
			data: location.search.replace(/^\?(.*)/gi, '$1')
		});
	},

	render: function() {
		this.$el.html(this.template());
		this.$el.append(this.tbody.el);
		return this;
	}

}));