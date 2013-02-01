Koala.views.add('matchup_form', Backbone.View.extend({

	el: $('#matchup_form_target'),

	template: _.template($('#matchup_form').html()),

	events: {
		'click #bestOf li' : 'changeBestOf'
	},

	initialize: function(options) {

		var Teams = Koala.collections.new('teams');
		var teamA_typeahead = Koala.views.new('team_typeahead', {
			collection: Teams
		});
		var teamB_typeahead = Koala.views.new('team_typeahead', {
			collection: Teams
		});
		Teams.fetch({
			data: {
				fields: ['id','name'],
				per_page: 1000
			}
		});

		this.Teams = Teams;
		this.teamA_typeahead = teamA_typeahead;
		this.teamB_typeahead = teamB_typeahead;

		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.teamA_typeahead, 'change', this.setTeamA);
		this.listenTo(this.teamB_typeahead, 'change', this.setTeamB);
	},

	render: function() {
		this.$el.html(this.template(this.model.attributes));
		$('.teamA', this.el).append(this.teamA_typeahead.el);
		$('.teamB', this.el).append(this.teamB_typeahead.el);

		//Set defaults
		if(this.model.attributes.teams) {
			for(var i = 0; i < this.model.attributes.teams; i++) {
				var team = this.model.attributes.teams[i];
				$(this.teamA_typeahead.el).val(team.name);
			}
		}

		return this;
	},

	changeBestOf: function(event) {
		if($(event.currentTarget).hasClass('active')) return;

		//Remove class active
		$('#bestOf li.active', this.el).removeClass('active');
		$(event.currentTarget).addClass('active');

		this.model.set('best_of', $('a', event.currentTarget).html(), {
			silent: true
		});
	},

	changeTeamA: function() {

	},

	changeTeamB: function() {

	}

}));
