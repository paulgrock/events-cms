Koala.views.add('team_typeahead', Backbone.View.extend({
	
	tagName: 'input',
	className: 'span3 team_typeahead',
	attributes: {
		type: 'text',
		placeholder: 'Enter a team name...'
	},

	events: {
		'change' : 'onChange',
		'keyup' : 'onChange'
	},

	initialize: function() {
		this.listenTo(this.collection, 'reset', this.bindTypeahead);
	},

	bindTypeahead: function() {
		this.$el.typeahead({
			source: this.collection.pluck('name')
		});
	},

	onChange: function() {
		this.trigger('change');
	},

	setValue: function(value) {
		this.$el.val(value);
	},

	getTeam: function() {
		var name = this.$el.val();
		var found = this.collection.find(function(team) {
			return team.get('name') === name;
		});

		if(!found) return;

		return {id: found.get('id')};
	}

}));
