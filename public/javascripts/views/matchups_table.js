Koala.views.add('matchups_table', Backbone.View.extend({

	tagName: "table",
	template: Koala.templates.get('matchups_table'),
	className: "table table-hover",

	initialize: function() {
		var Collection = Koala.collections.new('matchups');
		this.tbody = Koala.views.new('tbody', {
			collection: Collection,
			rowView: 'matchup_tr'
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