//Koala FrontEnd - James Burroughs 2013!

(function($, Backbone) {

	if(window.Koala) return;

	var models = {};
	var collections = {};
	var views = {};

	//Expose Koala
	window.Koala = {

		collections: {
			get: function(key) {
				return collections[key];
			},
			add: function(key, model) {
				collections[key] = model;
			},
			new: function(key, models, options) {
				if(!collections[key]) return;
				return new collections[key](models, options);
			},
			remove: function(key) {
				delete collections[key];
			}
		},

		models: {
			get: function(key) {
				return models[key];
			},
			add: function(key, model) {
				models[key] = model;
			},
			new: function(key, attributes, options) {
				if(!models[key]) return;
				return new models[key](attributes, options);
			},
			remove: function(key) {
				delete models[key];
			}
		},

		views: {
			get: function(key) {
				return views[key];
			},
			add: function(key, model) {
				views[key] = model;
			},
			new: function(key, options) {
				if(!views[key]) return;
				return new views[key](options);
			},
			remove: function(key) {
				delete views[key];
			}
		}

	};


})(jQuery, Backbone);Koala.models.add('event', Backbone.Model.extend({
	urlRoot: '/api/events',
	defaults: {
		title: "",
		stream: "",
		groups: null,
		starts_at: "",
		ends_at: "",
		matchup: null
	}
}));Koala.models.add('group', Backbone.Model.extend({
}));Koala.models.add('matchup', Backbone.Model.extend({
	urlRoot: '/api/matchups',
	defaults: {
		best_of: 3,
		teams: [
			{name: "TBA"},
			{name: "TBA"}
		]
	}
}));

Koala.models.add('stream', Backbone.Model.extend({
	
}));Koala.models.add('team', Backbone.Model.extend({}));
Koala.models.add('warning', Backbone.Model.extend({
	defaults: {
		header: '',
		message: ''
	}
}));Koala.collections.add('events', Backbone.Collection.extend({
	model: Koala.models.get('event'),
	url: "/api/events"
}));Koala.collections.add('groups', Backbone.Collection.extend({
	model: Koala.models.get('group'),
	url: "/api/groups"
}));Koala.collections.add('matchups', Backbone.Collection.extend({
	model: Koala.models.get('matchup'),
	url: "/api/matchups"
}));

Koala.collections.add('streams', Backbone.Collection.extend({
	model: Koala.models.get('stream'),
	url: "/api/streams"
}));Koala.collections.add('teams', Backbone.Collection.extend({
	model: Koala.models.get('team'),
	url: "/api/teams"
}));Koala.views.add('confirm_delete_modal', Backbone.View.extend({
	
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

}));Koala.views.add('date_form', Backbone.View.extend({

	template: _.template($('#date_form').html()),

	events: {
		'change .date, .time' : 'onChange',
		'keyup .date, .time' : 'onChange',
		'click .todayBtn' : function() {
			$('.date', this.el).val(moment().format('L')).trigger('change');
		},
		'click .nowBtn' : function() {
			$('.time', this.el).val(moment().format('HH:mm')).trigger('change');
		}
	},

	initialize: function(options) {
		this.Warning = Koala.models.new('warning');
		this.warning_alert = Koala.views.new('warning', {model: this.Warning});
	},

	render: function() {
		this.$el.html(this.template({
			data: this.initialValues(),
			type: this.options.type || ''
		}));

		//Vendor Events
		$('.date', this.el).datepicker({numberOfMonths: 3});
		$('.nowBtn, .todayBtn', this.el).tooltip({title: "Based on your computer's clock."});

		$('.timeWarning .span4', this.el).append(this.warning_alert.el);
		this.warning();

		this.delegateEvents();

		return this;
	},

	initialValues: function() {
		var date = Date.parse(this.model.attributes[this.options.dateKey]);

		return {
			date: isNaN(date) ? '' : moment(date).format('L'),
			time: isNaN(date) ? '' : moment(date).format('HH:mm')
		};
	},

	generateDate: function() {
		var date = $('.date', this.el).val();
		var time = $('.time', this.el).val();

		if(!date || !time) return NaN;
		return moment(date+time, 'MM-DD-YYYYTHH:mm').format();
	},

	warning: function() {
		var date = this.generateDate();

		if(date) {

			this.Warning.set({
				header: this.options.warningHeader,
				message: moment(date).calendar()
			});	
		}
		else this.Warning.set(this.Warning.defaults);

	},

	onChange: function() {
		//Bubble event to anything listening
		this.trigger('change');
		this.warning();
	}

}));Koala.views.add('event_form', Backbone.View.extend({

	el: $('#event_form_target'),

	template: _.template($('#event_form').html()),

	events: {
		'keyup #event_title' : 'setTitle',
	},

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
			warningHeader: "Starting:",
			type: 'Start'
		});
		var endDate_form = Koala.views.new('date_form', {
			model: this.model,
			dateKey: 'ends_at',
			warningHeader: "Ending:",
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



}));Koala.views.add('event_tbody', Backbone.View.extend({
	
	el: document.getElementById("eventsTable"),

	initialize: function() {
		this.listenTo(this.collection, 'add', this.addOne);
		this.listenTo(this.collection, 'reset', this.addAll);
	},

	addOne: function(model) {
		var view = Koala.views.new('event_tr', {model: model});
		this.$el.append(view.render().el);
	},

	addAll: function() {
		this.collection.each(this.addOne, this);
	}

}));

Koala.views.add('event_tr', Backbone.View.extend({
	
	tagName: 'tr',

	events: {
		"click .delete" : function() {
			Koala.views.new('confirm_delete_modal', {
				model: this.model,
				modal: {
					action: "Confirm Event Deletion.",
					message: "Are you sure you want to permanently delete this event?",
					snippet: this.model.attributes.title,
				}
			});
		}
	},

	initialize: function() {
		this.listenTo(this.model, "change", this.render);
		this.listenTo(this.model, "destroy", this.destroy);

		this.data = {};
		for(var i in this.model.attributes) {
			if(this.model.attributes.hasOwnProperty(i)) this.data[i] = this.model.attributes[i];
		}
		this.data.starts_at = moment(this.model.attributes.starts_at).calendar();
		this.data.franchise = this.model.attributes.groups[0] && this.model.attributes.groups[0].name;
		this.data.status = this.status(this.model.attributes.starts_at, this.model.attributes.ends_at);
	},

	template: _.template($('#event_tr').html()),

	render: function() {
		this.$el.html(this.template(this.data));
		return this;
	},

	destroy: function() {
		this.remove();
	},

	status: function(start, end) {
		var now = new Date().getTime();
		var ends_at = Date.parse(end);
		var starts_at = Date.parse(start);

		if(now > ends_at) return "Complete";
		if(now > starts_at) return "Underway";
		if((now + 1000*60*30) > starts_at) return "Starting Soon";
		return "Pending";
	}

}));Koala.views.add('group_option', Backbone.View.extend({
	
	tagName: 'option',

	render: function() {
		this.el.text = this.model.attributes.name;
		this.el.value = this.model.attributes.id;
		return this;
	}

}));Koala.views.add('group_pill', Backbone.View.extend({
	
	tagName: 'li',

	template: _.template($('#group_pill').html()),

	initialize: function() {
		var isActive = this.model.get('active');
		if(isActive) this.$el.addClass('active');
	},

	render: function() {
		var slug = this.model.get("slug");
		if(slug) this.model.set('href', location.pathname + "?group=" + this.model.get("slug"));
		else this.model.set('href', location.pathname);
		this.$el.html(this.template(this.model.attributes));
		return this;
	}

}));Koala.views.add('group_pills', Backbone.View.extend({
	
	tagName: 'ul',
	className: 'nav nav-pills',

	initialize: function() {
		this.listenTo(this.collection, "reset", this.addAll);
	},

	addOne: function(model) {
		var view = Koala.views.new('group_pill', {model: model});
		this.$el.append(view.render().el);
	},

	addAll: function() {

		//Create an 'all' filter
		var allPill = Koala.models.new('group', {
			name: "All"
		});
		this.collection.add(allPill, {silent: true, at: 0});

		//Find active filter based on current group query param
		var querySlug = location.search.replace(/^\?.*group=([^&]*).*$/gi, "$1");
		if(querySlug) {
			var matchingGroup = this.collection.find(function(group) {
				return group.get('slug') === querySlug;
			});
			if(matchingGroup) matchingGroup.set('active', true);
		}
		else allPill.set('active', true);

		this.collection.each(this.addOne, this);
	}

}));Koala.views.add('group_select', Backbone.View.extend({
	
	tagName: 'select',
	className: 'span3',
	id: 'group_select',
	attributes: {
		multiple: "multiple"
	},

	events: {
		'change' : 'onChange'
	},

	initialize: function() {
		this.listenTo(this.collection, "reset", this.addAll);
	},

	addOne: function(model) {
		var view = Koala.views.new('group_option', {model: model});
		this.$el.append(view.render().el);
	},

	addAll: function() {
		this.collection.each(this.addOne, this);
	},

	setIndex: function(groups) {
		if(!groups || !groups.length) return;

		var groupMap = {};

		//Populate group map with id's from given groups
		for(var i = 0, len = groups.length; i < len; i++) {
			groupMap[groups[i].id] = groups[i].name;
		}

		//Select any options that have values that exist in group map
		for(var i = 0, len = this.el.options.length; i < len; i++) {
			var option = this.el.options[i];
			if(groupMap[option.value]) option.selected = true;
		}
	},

	getSelectedGroups: function() {
		var groupList = [];
		var options = this.el.options;
		for(var i = 0, len = options.length; i < len; i++) {
			if(options[i].selected) groupList.push({id: options[i].value});
		}
		return groupList;
	},

	onChange: function() {
		this.trigger('change');
	}

}));Koala.views.add('matchup_form', Backbone.View.extend({

	el: $('#matchup_form_target'),

	template: _.template($('#matchup_form').html()),

	events: {
		'click #bestOf li' : 'changeBestOf'
	},

	initialize: function(options) {

		var Teams = Koala.collections.new('teams');
		var teamA_typeahead = Koala.views.new('team_typeahead', {
			collection: Teams
		});
		var teamB_typeahead = Koala.views.new('team_typeahead', {
			collection: Teams
		});
		Teams.fetch({
			data: {
				fields: "id,name",
				per_page: 1000
			}
		});

		this.Teams = Teams;
		this.teamA_typeahead = teamA_typeahead;
		this.teamB_typeahead = teamB_typeahead;

		this.listenTo(this.teamA_typeahead, 'change', this.changeTeams);
		this.listenTo(this.teamB_typeahead, 'change', this.changeTeams);
		if(this.model.isNew()) this.listenTo(Teams, 'reset', this.changeTeams);
	},

	render: function() {
		this.$el.html(this.template(this.model.attributes));
		$('.teamA', this.el).append(this.teamA_typeahead.el);
		$('.teamB', this.el).append(this.teamB_typeahead.el);
		this.fillTeams();

		return this;
	},

	fillTeams: function() {
		var teamList = this.model.get('teams');
		var teamA = teamList.shift();
		var teamB = teamList.shift();
		this.teamA_typeahead.setValue(teamA && teamA.name || "TBA");
		this.teamB_typeahead.setValue(teamB && teamB.name || "TBA");

		if(!teamA || !teamB) this.changeTeams();
	},

	changeBestOf: function(event) {
		if($(event.currentTarget).hasClass('active')) return;

		//Remove class active
		$('#bestOf li.active', this.el).removeClass('active');
		$(event.currentTarget).addClass('active');

		this.model.set('best_of', $('a', event.currentTarget).html());
		this.save();
	},

	changeTeams: function() {
		var teamList = [];
		teamList.push(this.teamA_typeahead.getTeam());
		teamList.push(this.teamB_typeahead.getTeam());
		this.model.set('teams', teamList);
		this.save();
	},

	save: function() {
		if(this.model.isNew() || !this.model.hasChanged()) return;
		this.model.save();
	}

}));
Koala.views.add('stream_option', Backbone.View.extend({
	
	tagName: 'option',

	render: function() {
		this.el.text = this.model.attributes.name;
		this.el.value = this.model.attributes.id;
		return this;
	}

}));Koala.views.add('stream_select', Backbone.View.extend({
	
	tagName: 'select',
	className: 'span3',
	id: 'stream_select',

	events: {
		'change' : 'onChange'
	},

	initialize: function() {
		this.listenTo(this.collection, "reset", this.addAll);
	},

	addOne: function(model) {
		var view = Koala.views.new('stream_option', {model: model});
		this.$el.append(view.render().el);
	},

	addAll: function() {
		this.collection.each(this.addOne, this);
	},

	setIndex: function(id) {
		if(!id) return;

		for(var i = 0, len = this.el.options.length; i < len; i++) {
			var option = this.el.options[i];
			if(option.value === id) {
				option.selected = true;
				break;
			}
		}
	},

	getSelectedStream: function() {
		var id = $(this.el.selectedOptions[0]).val();
		if(!id) return;
		return {id: id};
	},

	onChange: function() {
		this.trigger('change');
	}

}));Koala.views.add('team_typeahead', Backbone.View.extend({
	
	tagName: 'input',
	className: 'span3 team_typeahead',
	attributes: {
		type: 'text',
		placeholder: 'Enter a team name...'
	},

	events: {
		'change' : 'onChange',
		'keyup' : 'onChange'
	},

	initialize: function() {
		this.listenTo(this.collection, 'reset', this.bindTypeahead);
	},

	bindTypeahead: function() {
		this.$el.typeahead({
			source: this.collection.pluck('name')
		});
	},

	onChange: function() {
		this.trigger('change');
	},

	setValue: function(value) {
		this.$el.val(value);
	},

	getTeam: function() {
		var name = this.$el.val();
		var found = this.collection.find(function(team) {
			return team.get('name') === name;
		});

		if(!found) return;

		return {id: found.get('id')};
	}

}));
Koala.views.add('warning', Backbone.View.extend({
	className: 'alert',
	template: _.template($('#warning').html()),

	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
		this.render();
	},

	render: function() {
		if(this.model.attributes.header === '') this.$el.hide();
		else this.$el.show();

		this.$el.html(this.template(this.model.attributes));
	}
}));