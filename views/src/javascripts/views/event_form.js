Koala.views.add('event_form', Backbone.View.extend({

	events: {
		'keyup #event_title' : 'setTitle',
	},

	template: Koala.templates.get('event_form'),

	initialize: function() {
		//Streams
		var Streams = Koala.collections.new('streams');
		var stream_select = Koala.views.new('stream_select', {
			collection: Streams
		});
		Streams.fetch({
			fields: "id,name"
		});

		//Franchise
		var Groups = Koala.collections.new('groups');
		var group_select = Koala.views.new('group_select', {
			collection: Groups
		});
		Groups.fetch({
			data: {
				fields: "id,name"
			}
		});

		//Date Forms
		var startDate_form = Koala.views.new('date_form', {
			model: this.model,
			dateKey: 'starts_at',
			warningHeader: "Starting: ",
			type: 'Start'
		});
		var endDate_form = Koala.views.new('date_form', {
			model: this.model,
			dateKey: 'ends_at',
			warningHeader: "Ending: ",
			type: 'End'
		});


		//Bind to view
		this.collections = {
			streams: Streams,
			groups: Groups
		};

		this.views = {
			stream_select: stream_select,
			group_select: group_select,
			startDate_form: startDate_form,
			endDate_form: endDate_form
		};

		//Listeners
		var self = this;
		this.listenTo(Streams, 'reset', this.prefill.setStreamIndex);
		this.listenTo(Groups, 'reset', this.prefill.setGroupIndex);

		this.listenTo(stream_select, 'change', this.setStream);
		this.listenTo(group_select, 'change', this.setGroups);
		this.listenTo(startDate_form, 'change', this.setStarts_at);
		this.listenTo(endDate_form, 'change', this.setEnds_at);

		//Set defaults
		if(this.model.isNew()) this.listenTo(Streams, 'reset', this.setStream); //New streams require a stream by default

	},

	render: function() {
		this.$el.html(this.template(this.model.attributes));
		$('#event-stream-wrapper').append(this.views.stream_select.render().el);
		$('#event-group-wrapper').append(this.views.group_select.render().el);
		$('#startDate').replaceWith(this.views.startDate_form.render().el);
		$('#endDate').replaceWith(this.views.endDate_form.render().el);

		//Augment endDate
		var self = this;
		$(this.views.endDate_form.el).off('click', '.todayBtn');
		$('.todayBtn', this.views.endDate_form.el)
		.click(function() {
			var startDate = $('.date', self.views.startDate_form.el).val();
			$('.date', self.views.endDate_form.el).val(startDate).trigger('change');
		})
		.html('Same Day');

		//Prefill with existing data
		for(var i in this.prefill) this.prefill[i].call(this);

		return this;
	},

	prefill: {
		setStreamIndex: function() {
			this.views.stream_select.setIndex(this.model.attributes.stream.id);
		},

		setGroupIndex: function() {
			this.views.group_select.setIndex(this.model.attributes.groups);
		}
	},

	setTitle: function() {
		var title = $('#event_title', this.el).val();
		this.model.set({title: title});
		this.save();
	},

	setStream: function() {
		var stream = this.views.stream_select.getSelectedStream();
		this.model.set({stream: stream});
		this.save();
	},

	setGroups: function() {
		var groups = this.views.group_select.getSelectedGroups();
		this.model.set({groups: groups});
		this.save();
	},

	setStarts_at: function() {
		var starts_at = this.views.startDate_form.generateDate();
		this.model.set({starts_at: starts_at});
		this.save();
	},

	setEnds_at: function() {
		var ends_at = this.views.endDate_form.generateDate();
		this.model.set({ends_at: ends_at});
		this.save();
	},

	save: function(data) {
		if(this.model.isNew() || !this.model.hasChanged()) return;
		this.model.save();
	}



}));