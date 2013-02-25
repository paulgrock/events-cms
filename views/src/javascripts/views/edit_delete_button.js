Koala.views.add('edit_delete_button', Backbone.View.extend({

	className: "btn-group",

	template: Koala.templates.get('edit_delete_button'),

	initialize: function(options) {
		this.type = options.type;
		this.href = options.href;
	},

	events: {
		"click .delete" : function() {
			Koala.views.new('confirm_delete_modal', {
				model: this.model,
				modal: {
					action: "Confirm " + this.type + " Deletion.",
					message: "Are you sure you want to permanently delete this " + this.type + "?",
					snippet: this.model.attributes.title,
				}
			});
		}
	},

	render: function() {
		this.$el.html(this.template({
			type: this.type,
			href: this.href
		}));

		return this;
	}

}));