Koala.views.add('team_input', Backbone.View.extend({

	tagName: "input",

	className: "span3",

	attributes: {
		type: "text",
		placeholder: "Enter an existing team's name..."
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

		//Fill with TBA if empty
		if(this.model.isNew()) {
			var TBA = this.findTeam("TBA");
			if(TBA) {
				this.model.set(TBA, {silent:true});
				this.render();
			}
		}
	},

	setTeam: function() {
		var name = this.$el.val();
		var team = this.findTeam(name);
		if(team) {
			this.model.clear({silent:true});
			this.model.set(team);
		}
		else {
			this.model.clear();
		}
	},

	findTeam: function(name) {
		var found = this.collection.find(function(team) {
			return team.get('name') === name;
		});

		if(!found) return;

		return found.attributes;
	}

}));