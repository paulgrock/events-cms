Koala.views.add('team_li', Backbone.View.extend({

	tagName: "li",

	className: "span3 team_li",

	template: Koala.templates.get('team_li'),

	initialize: function() {
		//Action Button
		this.actionButton = Koala.views.new('edit_delete_button', {
			type: "Team",
			href: "/teams/" + this.model.get('id'),
			model: this.model
		});

		this.listenTo(this.model, "change", this.render);
		this.listenTo(this.model, "destroy", this.destroy);
	},

	render: function() {
		var data = $.extend(true, {}, this.model.attributes);
		data.image_url = data.image_url || "";

		this.$el.html(this.template(data));
		$('.thumbnail', this.el).append(this.actionButton.render().el);

		Holder.run({
			images: $('.thumbnail img', this.el)[0]
		});

		return this;
	},

	destroy: function() {
		this.remove();
	}

}));
