Koala.views.add('matchup_form', Backbone.View.extend({

	tagName: 'fieldset',

	events: {
		'click #bestOf li' : 'changeBestOf'
	},

	template: Koala.templates.get('matchup_form'),

	initialize: function(options) {

		//Team Typeaheads
		this.Teams = Koala.collections.new('teams');

		this.teamA_typeahead = Koala.views.new('team_typeahead', {
			model: this.model.teamA,
			collection: this.Teams
		});

		this.teamB_typeahead = Koala.views.new('team_typeahead', {
			model: this.model.teamB,
			collection: this.Teams
		});

		this.Teams.fetch({
			data: {
				per_page: 5000
			}
		});

		//Games
		this.game_table = Koala.views.new('game_table', {
			collection: this.model.games,
			matchup: this.model
		});

		//Listeners
		this.listenTo(this.model.teamA, 'change', this.save);
		this.listenTo(this.model.teamB, 'change', this.save);
	},

	render: function() {
		this.$el.html(this.template(this.model.attributes));
		$('.teamA', this.el).append(this.teamA_typeahead.render().el);
		$('.teamB', this.el).append(this.teamB_typeahead.render().el);
		$('.gameTable', this.el).append(this.game_table.el);
		return this;
	},

	changeBestOf: function(event) {
		if($(event.currentTarget).hasClass('active')) return;

		//Remove class active
		$('#bestOf li.active', this.el).removeClass('active');
		$(event.currentTarget).addClass('active');

		this.model.set('best_of', $('a', event.currentTarget).html());
		this.save();
	},

	save: function() {
		if(this.model.isNew() || !this.model.hasChanged()) return;
		this.model.save();
	}

}));
