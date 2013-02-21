Koala.views.add('team_tr', Backbone.View.extend({
	
	tagName: 'tr',

	template: Koala.templates.get('team_tr'),

	events: {
		"click .delete" : function() {
			Koala.views.new('confirm_delete_modal', {
				model: this.model,
				modal: {
					action: "Confirm Team Deletion.",
					message: "Are you sure you want to permanently delete this team?",
					snippet: this.model.attributes.name,
				}
			});
		}
	},

	initialize: function() {
		this.listenTo(this.model, "change", this.render);
		this.listenTo(this.model, "destroy", this.destroy);
	},

	render: function() {
		this.$el.html(this.template(this.model.attributes));
		return this;
	},

	destroy: function() {
		this.remove();
	}

}));