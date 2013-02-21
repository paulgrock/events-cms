Koala.views.add('group_pills', Backbone.View.extend({
	
	tagName: 'ul',
	className: 'nav nav-pills',

	initialize: function() {
		this.listenTo(this.collection, "reset", this.addAll);
	},

	addOne: function(model) {
		var view = Koala.views.new('group_pill', {model: model});
		this.$el.append(view.render().el);
	},

	addAll: function() {

		//Create an 'all' filter
		var allPill = Koala.models.new('group', {
			name: "All"
		});
		this.collection.add(allPill, {silent: true, at: 0});

		//Find active filter based on current group query param
		var querySlug = location.search.replace(/^\?.*group=([^&]*).*$/gi, "$1");
		if(querySlug) {
			var matchingGroup = this.collection.find(function(group) {
				return group.get('slug') === querySlug;
			});
			if(matchingGroup) matchingGroup.set('active', true);
		}
		else allPill.set('active', true);

		this.collection.each(this.addOne, this);
	}

}));