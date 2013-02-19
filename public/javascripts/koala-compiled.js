//Koala FrontEnd - James Burroughs 2013!

(function($, Backbone) {

	if(window.Koala) return;

	var models = {};
	var collections = {};
	var views = {};
	var templates = {};

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
			}
		},

		templates: {
			add: function(key, templateString) {
				templates[key] = _.template(templateString);
			},
			get: function(key) {
				return templates[key];
			}
		}

	};


})(jQuery, Backbone);Koala.templates.add('confirm_modal', '<div class="modal-header"><button type="button" data-dismiss="modal" aria-hidden="true" class="close">x</button><h2><%= action %></h2></div><div class="modal-body"><div class="lead"><%= message %></div><p class="text-info">&quot;<%= snippet %>&quot;</p></div><div class="modal-footer"><button data-dismiss="modal" aria-hidden="true" class="btn cancel">Cancel</button><button class="btn btn-danger confirm">Confirm</button></div>');Koala.templates.add('date_form', '<div class="control-group"><label class="control-label"><%= type %> Date:</label><div class="controls"><div class="input-prepend input-append"><span class="span2 add-on">MM/DD/YYYY</span><input type="text" placeholder="Enter a start date..." value="<%= data.date %>" class="span2 date"/><button type="button" class="btn todayBtn">Today</button></div></div></div><div class="control-group"><label class="control-label"><%= type %> Time:</label><div class="controls"><div class="input-prepend input-append"><span class="span2 add-on">HH:MM</span><input type="text" placeholder="HH:MM" value="<%= data.time %>" class="span1 time"/><button type="button" class="btn nowBtn">Now</button></div><span class="help-inline">(24hr)</span><div class="timeWarning"><div class="span4"></div></div></div></div>');Koala.templates.add('event_form', '<fieldset><legend>General</legend><div class="control-group"><label for="event_title" class="control-label">Title:</label><div class="controls"><input type="text" id="event_title" placeholder="Enter an Event Title..." value="<%= title %>" class="span3"/></div></div><div class="control-group"><label for="stream_select" class="control-label">Stream:</label><div id="event-stream-wrapper" class="controls"></div></div><div class="control-group"><label for="group_select" class="control-label">Group(s):</label><div id="event-group-wrapper" class="controls"></div></div></fieldset><fieldset><legend>Date and Time</legend><div id="startDate"></div><hr/><div id="endDate"></div></fieldset>');Koala.templates.add('event_tr', '<td><span class=\'label <% switch(status) { case \'Pending\':  %>label-inverse<%  break;   case \'Underway\':  %>label-important<%  break;   case \'Starting Soon\':  %>label-warning<%  break; }%>\'><%= status %></span></td><td><%= franchise %></td><td><%= title %></td><td><%= starts_at %></td><td><div class="btn-group"><a href="/events/<%= id %>" class="btn">Edit</a><button data-toggle="dropdown" class="btn dropdown-toggle"><span class="caret"></span></button><ul role="menu" class="dropdown-menu"><li><a class="delete">Delete</a></li></ul></div></td>');Koala.templates.add('events_table', '<thead><th>Status</th><th>Franchise</th><th>Title</th><th>Starts</th><th>Action</th></thead>');Koala.templates.add('game_action_td_finished', '-');Koala.templates.add('game_action_td_ready', '<button class="btn start_select">Start Game</button>');Koala.templates.add('game_action_td_underway', '<div class="btn-group"><a data-toggle="dropdown" href="#" class="btn btn-primary dropdown-toggle">Choose Winner <span class="caret"></span></a><ul class="dropdown-menu"><li> <a class="teamA_select"><%= teamA.name %></a></li><li><a class="teamB_select"><%= teamB.name %></a></li></ul></div>');Koala.templates.add('game_table', '<thead><tr><th>#</th><th>Status</th><th>Started</th><th>Ended</th><th>Winner</th><th>Action</th></tr></thead><tbody></tbody>');Koala.templates.add('game_tr', '<td><%= number %></td><td><span class=\'label <%   switch(status) {   case \'underway\':    %>label-info<%    break;       case \'ready\':    %>label-warning<%    break;   }  %>\'><%= status.toUpperCase() %></span></td><td><%= starts_at %></td><td><%= ends_at %></td><td><%= winner %></td><td class="action"></td>');Koala.templates.add('group_pill', '<a href="<%= href %>"><%= name %></a>');Koala.templates.add('matchup_form', '<legend>Matchup</legend><div class="controls"><div class="alert alert-info"><button type="button" data-dismiss="alert" class="close">&times;</button><strong>Please Note!</strong> Teams entered into the matchup below must have first been added through the \'Team Creation\' process!</div></div><div class="control-group"><label class="control-label">Team A Name:</label><div class="controls teamA"></div></div><div class="control-group"><label class="control-label">Team B Name:</label><div class="controls teamB"></div></div><div class="control-group"><label class="control-label">Best Of:</label><div class="controls"><ul id="bestOf" class="nav nav-pills"><% for(var i = 1; i <= 13; i+=2) { %> <% if(i === best_of) { %>  <li class="active"><a><%= i %></a></li> <% } else { %>  <li><a><%= i %></a></li> <% } %><% } %></ul></div></div><% if(games && games.length) { %><div class="control-group"><label class="control-label">Games:</label><div class="controls gameTable"></div></div><% } %>');Koala.templates.add('matchup_tr', '<td><span class="label label-success"><%= status %></span></td><td><%= teams[0] && teams[0].name || "TBA" %></td><td><%= teams[1] && teams[1].name || "TBA" %></td><td><%= best_of %></td><td><%= games.length %></td><td><div class="btn-group"><a href="/matchups/<%= id %>" class="btn">Edit</a><button data-toggle="dropdown" class="btn dropdown-toggle"><span class="caret"></span></button><ul role="menu" class="dropdown-menu"><li><a class="delete">Delete</a></li></ul></div></td>');Koala.templates.add('matchups_table', '<thead><th>Status</th><th>Team A</th><th>Team B</th><th>Best Of</th><th>Played</th><th>Action</th></thead>');Koala.templates.add('show_tr', '');Koala.templates.add('team_tr', '<td><%= name %></td><td><div class="btn-group"><a href="/teams/<%= id %>" class="btn">Edit</a><button data-toggle="dropdown" class="btn dropdown-toggle"><span class="caret"></span></button><ul role="menu" class="dropdown-menu"><li><a class="delete">Delete</a></li></ul></div></td>');Koala.templates.add('teams_table', '<colgroup><col/><col width="1"/></colgroup><thead><th>Name</th><th>Action</th></thead>');Koala.templates.add('video_tr', '');Koala.templates.add('warning', '<button type="button" data-dismiss="alert" class="close">&times;</button><strong><%= header %><%= message %></strong>');Koala.models.add('event', Backbone.Model.extend({
	urlRoot: '/api/events',
	defaults: {
		title: "",
		stream: "",
		groups: null,
		starts_at: "",
		ends_at: "",
		matchup: null
	}
}));Koala.models.add('game', Backbone.Model.extend({
	urlRoot: '/api/games'
}));
Koala.models.add('group', Backbone.Model.extend({
}));Koala.models.add('matchup', Backbone.Model.extend({
	urlRoot: '/api/matchups',

	defaults: {
		best_of: 3,
		teams: [
			{name: "TBA"},
			{name: "TBA"}
		],
		games: []
	},

	initialize: function() {
		this.games = Koala.collections.new('games', this.attributes.games);
		this.on('change:games', function() {
			this.games.update(this.attributes.games);
		});
	}
}));

Koala.models.add('stream', Backbone.Model.extend({
	
}));Koala.models.add('team', Backbone.Model.extend({
	urlRoot: '/api/teams',
}));
Koala.models.add('warning', Backbone.Model.extend({
	defaults: {
		header: '',
		message: ''
	}
}));Koala.collections.add('events', Backbone.Collection.extend({
	model: Koala.models.get('event'),
	url: "/api/events"
}));Koala.collections.add('games', Backbone.Collection.extend({
	model: Koala.models.get('game'),
	url: "/api/games"
}));

Koala.collections.add('groups', Backbone.Collection.extend({
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

	template: Koala.templates.get('confirm_modal'),

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

	template: Koala.templates.get('date_form'),

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



}));Koala.views.add('event_tr', Backbone.View.extend({
	
	tagName: 'tr',

	template: Koala.templates.get('event_tr'),

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

}));Koala.views.add('events_table', Backbone.View.extend({

	tagName: "table",

	template: Koala.templates.get('events_table'),
	
	className: "table table-hover",

	initialize: function() {
		var Collection = Koala.collections.new('events');
		this.tbody = Koala.views.new('tbody', {
			collection: Collection,
			rowView: 'event_tr'
		});

		Collection.fetch({
			data: location.search.replace(/^\?(.*)/gi, '$1')
		});
	},

	render: function() {
		this.$el.html(this.template());
		this.$el.append(this.tbody.el);
		return this;
	}

}));Koala.views.add('game_action_td', Backbone.View.extend({
	
	tagName: "td",

	events: {
		"click .teamA_select" : function() {
			this.model.set('winner', this.matchup.teams[0]);
			this.end();
		},
		"click .teamB_select" : function() {
			this.model.set("winner", this.matchup.teams[1]);
			this.end();
		},
		"click .start_select" : "start"
	},

	initialize: function(options) {
		this.matchup = options.matchup;
	},

	render: function() {
		var data = $.extend(true, {}, this.model.attributes);
		data.teamA = this.matchup.teams && this.matchup.teams[0];
		data.teamB = this.matchup.teams && this.matchup.teams[1];

		this.$el.html(this.getTemplate()(data))

		this.delegateEvents();

		return this;
	},

	getTemplate: function() {
		switch(this.model.attributes.status) {
			case "underway":
				return Koala.templates.get('game_action_td_underway');

			case "finished":
				return Koala.templates.get('game_action_td_finished');

			default:
				return Koala.templates.get('game_action_td_ready');
		}
	},

	end: function() {
		this.model.set('ends_at', moment().format());
		this.sync();
	},

	start: function() {
		this.model.set('starts_at', moment().format());
		this.sync();
	},

	sync: function() {
		this.model.save(null, {
			success: function(model) {
				model.fetch();
			}
		});
	}

}));Koala.views.add('game_table', Backbone.View.extend({

	tagName: "table",

	className: "table table-hover",

	template: Koala.templates.get('game_table'),

	initialize: function(options) {
		this.listenTo(this.collection, 'add', this.addOne);
		this.listenTo(this.collection, 'reset', this.addAll);
		this.matchup = options.matchup;
	},

	render: function() {
		this.$el.html(this.template());
		this.addAll();
		return this;
	},

	addOne: function(model) {
		var view = Koala.views.new('game_tr', {
			model: model,
			matchup: this.matchup
		});
		$('tbody', this.el).append(view.render().el);
	},

	addAll: function() {
		this.collection.each(this.addOne, this);
	}

}));Koala.views.add('game_tr', Backbone.View.extend({

	tagName: "tr",

	template: Koala.templates.get('game_tr'),

	initialize: function(options) {
		this.action = Koala.views.new('game_action_td', {
			model: this.model,
			matchup: options.matchup
		});
		this.listenTo(this.model, 'change', this.render);
	},

	render: function() {
		//Pass matchup data to template
		var data = $.extend(true, {}, this.model.attributes);
		data.starts_at = data.starts_at ? moment(data.starts_at).calendar() : "-";
		data.ends_at = data.ends_at ? moment(data.ends_at).calendar() : "-";
		data.winner = data.winner && data.winner.name || "-";

		this.$el.html(this.template(data));
		$('.action', this.el).replaceWith(this.action.render().el);

		return this;
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

	template: Koala.templates.get('group_pill'),

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

	tagName: 'fieldset',

	events: {
		'click #bestOf li' : 'changeBestOf'
	},

	template: Koala.templates.get('matchup_form'),

	initialize: function(options) {

		//Team Typeaheads
		this.Teams = Koala.collections.new('teams');
		this.teamA_typeahead = Koala.views.new('team_typeahead', {
			collection: this.Teams
		});
		this.teamB_typeahead = Koala.views.new('team_typeahead', {
			collection: this.Teams
		});
		this.Teams.fetch({
			data: {
				fields: "id,name",
				per_page: 1000
			}
		});

		this.listenTo(this.teamA_typeahead, 'change', this.changeTeams);
		this.listenTo(this.teamB_typeahead, 'change', this.changeTeams);
		if(this.model.isNew()) this.listenTo(this.Teams, 'reset', this.changeTeams);

		//Games
		this.game_table = Koala.views.new('game_table', {
			collection: this.model.games,
			matchup: this.model.attributes
		});
	},

	render: function() {
		this.$el.html(this.template(this.model.attributes));
		$('.teamA', this.el).append(this.teamA_typeahead.el);
		$('.teamB', this.el).append(this.teamB_typeahead.el);
		this.fillTeams();

		if(this.model.games.length) {
			$('.gameTable', this.el).append(this.game_table.render().el);
		}

		return this;
	},

	fillTeams: function() {
		var teamList = this.model.get('teams');
		var teamA = teamList[0];
		var teamB = teamList[1];
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
Koala.views.add('matchup_tr', Backbone.View.extend({
	
	tagName: 'tr',

	template: Koala.templates.get('matchup_tr'),

	events: {
		"click .delete" : function() {
			Koala.views.new('confirm_delete_modal', {
				model: this.model,
				modal: {
					action: "Confirm Matchup Deletion.",
					message: "Are you sure you want to permanently delete this matchup?",
					snippet: this.model.attributes.title,
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

}));Koala.views.add('matchups_table', Backbone.View.extend({

	tagName: "table",

	template: Koala.templates.get('matchups_table'),
	
	className: "table table-hover",

	initialize: function() {
		var Collection = Koala.collections.new('matchups');
		this.tbody = Koala.views.new('tbody', {
			collection: Collection,
			rowView: 'matchup_tr'
		});

		Collection.fetch({
			data: location.search.replace(/^\?(.*)/gi, '$1')
		});
	},

	render: function() {
		this.$el.html(this.template());
		this.$el.append(this.tbody.el);
		return this;
	}

}));Koala.views.add('stream_option', Backbone.View.extend({
	
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

}));Koala.views.add('tbody', Backbone.View.extend({
	
	tagName: "tbody",

	initialize: function(options) {
		this.listenTo(this.collection, 'add', this.addOne);
		this.listenTo(this.collection, 'reset', this.addAll);
		this.rowView = options.rowView;
	},

	addOne: function(model) {
		var view = Koala.views.new(this.rowView, {model: model});
		this.$el.append(view.render().el);
	},

	addAll: function() {
		this.collection.each(this.addOne, this);
	}

}));

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
Koala.views.add('teams_table', Backbone.View.extend({

	tagName: "table",

	template: Koala.templates.get('teams_table'),
	
	className: "table table-hover",

	initialize: function() {
		var Collection = Koala.collections.new('teams');
		this.tbody = Koala.views.new('tbody', {
			collection: Collection,
			rowView: 'team_tr'
		});

		Collection.fetch({
			data: location.search.replace(/^\?(.*)/gi, '$1')
		});
	},

	render: function() {
		this.$el.html(this.template());
		this.$el.append(this.tbody.el);
		return this;
	}

}));Koala.views.add('warning', Backbone.View.extend({
	className: 'alert',

	template: Koala.templates.get('warning'),

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