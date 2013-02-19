Koala.views.add('teams_table', Backbone.View.extend({

	tagName: "table",

	template: Koala.templates.get('teams_table'),
	
	className: "table table-hover",

	initialize: function() {
		var Collection = Koala.collections.new('teams');
		this.tbody = Koala.views.new('tbody', {
			collection: Collection,
			rowView: 'team_tr'
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