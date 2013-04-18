Koala.views.add('team_image', Backbone.View.extend({

	tagName: "img",

	className: "team_image img-polaroid",

	attributes: {
		width: "40px",
		height: "40px"
	},

	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
	},

	render: function() {
		if(this.model.get('image_url')) {
			this.$el.attr("src", this.model.get('image_url'))
			.removeAttr("data-src");
		}
		else {
			this.$el.attr("data-src", "holder.js/40x40")
			.removeAttr("src");

			Holder.run({
    			images: this.el
			});
		}

		return this;
	}

}));
