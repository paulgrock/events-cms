Koala.views.add('status_span', Backbone.View.extend({
	
	tagName: "span",

	initialize: function() {
		this.listenTo(this.model, 'change:status', this.render);
	},

	render: function(status) {
		var newClass = "label";
		var status = (this.model.get('status') || status || "Unknown").toUpperCase();

		switch(status) {
			case "FINISHED":
				newClass += " label-success";
				break;

			case "UNDERWAY":
				newClass += " label-important";
				break;

			case "READY":
				newClass += " label-warning";
				break;

			case "STARTING":
				newClass += " label-warning";
				break;
		}

		this.el.className = newClass;
		this.$el.text(status);

		return this;
	}

}));