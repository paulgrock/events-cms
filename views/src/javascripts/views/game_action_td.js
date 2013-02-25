Koala.views.add('game_action_td', Backbone.View.extend({
	
	tagName: "td",

	events: {
		"click .teamA_select" : function() {
			this.model.set('winner', this.matchup.get("teams")[0]);
			this.end();
		},
		"click .teamB_select" : function() {
			this.model.set("winner", this.matchup.get("teams")[1]);
			this.end();
		},
		"click .start_select" : "start"
	},

	initialize: function(options) {
		this.matchup = options.matchup;
		this.listenTo(this.matchup, "change:teams", this.render);
	},

	render: function() {
		var data = $.extend(true, {}, this.model.attributes);
		data.teamA = this.matchup.get("teams") && this.matchup.get("teams")[0];
		data.teamB = this.matchup.get("teams") && this.matchup.get("teams")[1];

		this.$el.html(this.getTemplate()(data))

		this.delegateEvents();

		return this;
	},

	getTemplate: function() {
		switch(this.model.get('status')) {
			case "underway":
				return Koala.templates.get('game_action_td_underway');

			case "finished":
				return Koala.templates.get('game_action_td_finished');

			default:
				return Koala.templates.get('game_action_td_ready');
		}
	},

	end: function() {
		this.model.set('ends_at', moment().format());
		this.sync();
	},

	start: function() {
		this.model.set('starts_at', moment().format());
		this.sync();
	},

	sync: function() {
		this.model.save(null, {
			success: function(model) {
				model.fetch();
			}
		});
	}

}));