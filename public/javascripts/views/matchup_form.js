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
			collection: this.Teams
		});
		this.teamB_typeahead = Koala.views.new('team_typeahead', {
			collection: this.Teams
		});
		this.Teams.fetch({
			data: {
				fields: "id,name",
				per_page: 1000
			}
		});

		this.listenTo(this.teamA_typeahead, 'change', this.changeTeams);
		this.listenTo(this.teamB_typeahead, 'change', this.changeTeams);
		if(this.model.isNew()) this.listenTo(this.Teams, 'reset', this.changeTeams);

		//Games
		this.game_table = Koala.views.new('game_table', {
			collection: this.model.games,
			matchup: this.model.attributes
		});
	},

	render: function() {
		this.$el.html(this.template(this.model.attributes));
		$('.teamA', this.el).append(this.teamA_typeahead.el);
		$('.teamB', this.el).append(this.teamB_typeahead.el);
		this.fillTeams();

		if(this.model.games.length) {
			$('.gameTable', this.el).append(this.game_table.render().el);
		}

		return this;
	},

	fillTeams: function() {
		var teamList = this.model.get('teams');
		var teamA = teamList[0];
		var teamB = teamList[1];
		this.teamA_typeahead.setValue(teamA && teamA.name || "TBA");
		this.teamB_typeahead.setValue(teamB && teamB.name || "TBA");

		if(!teamA || !teamB) this.changeTeams();
	},

	changeBestOf: function(event) {
		if($(event.currentTarget).hasClass('active')) return;

		//Remove class active
		$('#bestOf li.active', this.el).removeClass('active');
		$(event.currentTarget).addClass('active');

		this.model.set('best_of', $('a', event.currentTarget).html());
		this.save();
	},

	changeTeams: function() {
		var teamList = [];
		teamList.push(this.teamA_typeahead.getTeam());
		teamList.push(this.teamB_typeahead.getTeam());
		this.model.set('teams', teamList);
		this.save();
	},

	save: function() {
		if(this.model.isNew() || !this.model.hasChanged()) return;
		this.model.save();
	}

}));
