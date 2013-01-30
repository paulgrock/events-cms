Koala.views.add('team_typeahead', Backbone.View.extend({
	
	tagName: 'input',
	className: 'span3',
	attributes: {
		type: 'text',
		placeholder: 'Enter a team name...'
	},

	initialize: function() {
		this.listenTo(this.collection, 'reset', this.bindTypeahead);
	},

	bindTypeahead: function() {
		this.$el.typeahead({
			source: this.collection.pluck('name')
		});
	}

}));
