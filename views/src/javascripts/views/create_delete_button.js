Koala.views.add('create_delete_button', Backbone.View.extend({

	tagName: "btn-group",

	events: {
		"click .create" : function() {
			var self = this;

			$(".create", this.el).button('loading');

			this.model.save(null, {
				success: function(model, response) {
					var id = response && response.id;
					location.replace(self.back + "/" + id);
				},
				error: function(model, xhr) {
					window.scrollTo(0,0);
				},
				complete: function() {
					$(".create", self.el).button('reset');
				}
			});
		},

		"click .delete" : function() {
			var self = this;

			$(".delete", this.el).button('loading');

			this.model.destroy({
				success: function(model, response) {
					location.replace(self.back);
				},
				error: function(model, xhr) {
					window.scrollTo(0,0);
				},
				complete: function() {
					$(".delete", self.el).button('reset');
				}
			});
		}
	},

	initialize: function(options) {
		this.listenTo(this.model, "change", this.render);
		this.back = options.back;
		this.type = options.type;
	},

	render: function() {
		this.$el.html(this.getTemplate()({
			type: this.type || ""
		}));
		return this;
	},

	getTemplate: function() {
		if(this.model.isNew()) {
			return Koala.templates.get('create_button');
		}
		else {
			return Koala.templates.get('delete_button');
		}
	}

}));