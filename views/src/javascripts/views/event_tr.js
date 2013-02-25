Koala.views.add('event_tr', Backbone.View.extend({
	
	tagName: 'tr',

	template: Koala.templates.get('event_tr'),

	initialize: function() {
		this.listenTo(this.model, "change", this.render);
		this.listenTo(this.model, "destroy", this.destroy);

		//Action Button
		this.actionButton = Koala.views.new('edit_delete_button', {
			type: "Event",
			href: "/events/" + this.model.get('id'),
			model: this.model
		});

		//Status span
		this.status_span = Koala.views.new('status_span', {
			model: this.model
		});
	},

	render: function() {
		var data = $.extend(true, {}, this.model.attributes);
		data.starts_at 	= moment(this.model.attributes.starts_at).calendar();
		data.franchise 	= this.model.attributes.groups[0] && this.model.attributes.groups[0].name || "Not Assigned";

		var status 		= this.status(this.model.attributes.starts_at, this.model.attributes.ends_at);

		this.$el.html(this.template(data));
		$('.actionButton', this.el).append(this.actionButton.render().el);
		$('.status', this.el).append(this.status_span.render(status).el);
		return this;
	},

	destroy: function() {
		this.remove();
	},

	status: function(start, end) {
		var now = new Date().getTime();
		var ends_at = Date.parse(end);
		var starts_at = Date.parse(start);

		if(now > ends_at) return "finished";
		if(now > starts_at) return "underway";
		if((now + 1000*60*30) > starts_at) return "starting";
		return "pending";
	}

}));