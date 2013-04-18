Koala.views.add('teams_ul', Backbone.View.extend({

	tagName: "ul",

	className: "thumbnails",

	initialize: function(options) {

		this.collection = Koala.collections.new('teams');

		var Links = Koala.models.new('links');
		this.links_ul = Koala.views.new('links_ul', {
			model: Links
		});

		this.listenTo(this.collection, 'add', this.addOne);
		this.listenTo(this.collection, 'reset', this.addAll);

		this.collection.fetch({
			data: location.search.replace(/^\?(.*)/gi, '$1')
		})
		.done(function(data, textStatus, jqXHR) {
			var linkHeader = jqXHR.getResponseHeader('link');
			Links.set(Links.parse(linkHeader));
		});
	},

	render: function() {
		this.links_ul.render().$el.insertAfter(this.el);
	},

	addOne: function(model) {
		var view = Koala.views.new('team_li', {model: model});
		this.$el.append(view.render().el);
	},

	addAll: function() {
		this.collection.each(this.addOne, this);
	}

}));
