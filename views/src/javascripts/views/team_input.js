Koala.views.add('team_input', Backbone.View.extend({

	tagName: "input",

	className: "span3",

	attributes: {
		type: "text"
	},

	events: {
		'change' : 'setTeam',
		'keyup' : 'setTeam'
	},

	initialize: function() {
		this.listenTo(this.collection, 'reset', this.bindTypeahead);
	},

	render: function() {
		this.$el.val(this.model.get('name'));
		return this;
	},

	bindTypeahead: function() {
		this.$el.typeahead({
			source: this.collection.pluck('name')
		});
	},

	setTeam: function() {
		var name = this.$el.val();
		var team = this.findTeam(name);
		this.model.clear({silent:true});
		this.model.set(team);
	},

	findTeam: function(name) {
		var found = this.collection.find(function(team) {
			return team.get('name') === name;
		});

		if(!found) return;

		return found.attributes;
	}

}));