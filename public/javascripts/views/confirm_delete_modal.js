Koala.views.add('confirm_delete_modal', Backbone.View.extend({
	
	tagName: 'div',
	className: 'modal hide fade',
	attributes: {
		role: 'dialog',
		'aria-hidden': 'true'
	},

	events: {
		"click .confirm" : function() {
			this.model.destroy();
		}
	},

	initialize: function() {
		var self = this;
		this.listenTo(this.model, "change", this.render);
		this.listenTo(this.model, "destroy", this.hide);
		this.$el.on('hidden', function() {
			self.destroy();
		});
		$("body").append(this.render().el);
		$(this.$el).modal();
	},

	template: _.template($('#confirm_modal').html()),

	render: function() {
		this.$el.html(this.template(this.options.modal));
		return this;
	},

	hide: function() {
		this.$el.modal('hide');
	},

	destroy: function() {
		this.remove();
	}

}));