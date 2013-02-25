Koala.views.add('game_tr', Backbone.View.extend({

	tagName: "tr",

	template: Koala.templates.get('game_tr'),

	initialize: function(options) {
		this.action = Koala.views.new('game_action_td', {
			model: this.model,
			matchup: options.matchup
		});

		this.status_span = Koala.views.new('status_span', {
			model: this.model
		});

		this.listenTo(this.model, 'change', this.render);
	},

	render: function() {
		//Pass matchup data to template
		var data = $.extend(true, {}, this.model.attributes);
		data.starts_at = data.starts_at ? moment(data.starts_at).calendar() : "-";
		data.ends_at = data.ends_at ? moment(data.ends_at).calendar() : "-";
		data.winner = data.winner && data.winner.name || "-";

		this.$el.html(this.template(data));

		$('.action', this.el).replaceWith(this.action.render().el);
		$('.status', this.el).append(this.status_span.render().el);

		return this;
	}

}));