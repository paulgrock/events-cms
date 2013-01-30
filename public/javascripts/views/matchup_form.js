Koala.views.add('matchup_form', Backbone.View.extend({

	el: $('#matchup_form_target'),

	template: _.template($('#matchup_form').html()),

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
	},

	render: function() {
		this.$el.html(this.template());
		$('.teamA', this.el).append(this.teamA_typeahead.el);
		$('.teamB', this.el).append(this.teamB_typeahead.el);
		return this;
	}

}));
