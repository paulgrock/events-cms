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


})(jQuery, Backbone);Koala.templates.add('confirm_modal', '<div class="modal-header"><button type="button" data-dismiss="modal" aria-hidden="true" class="close">x</button><h2><%= action %></h2></div><div class="modal-body"><div class="lead"><%= message %></div><p class="text-info">&quot;<%= snippet %>&quot;</p></div><div class="modal-footer"><button data-dismiss="modal" aria-hidden="true" class="btn cancel">Cancel</button><button class="btn btn-danger confirm">Confirm</button></div>');Koala.templates.add('create_button', '<button data-loading-text="Creating..." class="btn btn-success create"><i class="icon-ok icon-white"></i> Create <%= type %></button>');Koala.templates.add('date_form', '<div class="control-group"><label class="control-label"><%= type %> Date:</label><div class="controls"><div class="input-prepend input-append"><span class="span2 add-on">MM/DD/YYYY</span><input type="text" placeholder="Enter a start date..." value="<%= data.date %>" class="span2 date"/><button type="button" class="btn todayBtn">Today</button></div></div></div><div class="control-group"><label class="control-label"><%= type %> Time:</label><div class="controls"><div class="input-prepend input-append"><span class="span2 add-on">HH:MM</span><input type="text" placeholder="HH:MM" value="<%= data.time %>" class="span1 time"/><button type="button" class="btn nowBtn">Now</button></div><span class="help-inline">(24hr)</span><div class="timeWarning"><div class="span4"></div></div></div></div>');Koala.templates.add('delete_button', '<button data-loading-text="Deleting..." class="btn btn-danger delete"><i class="icon-trash icon-white"></i> Delete <%= type %></button>');Koala.templates.add('edit_delete_button', '<a href="<%= href %>" class="btn"><i class="icon-edit"></i> Edit</a><button data-toggle="dropdown" class="btn dropdown-toggle"><span class="caret"></span></button><ul role="menu" class="dropdown-menu"><li><a class="delete"><i class="icon-trash"></i> Delete</a></li></ul>');Koala.templates.add('event_form', '<fieldset><legend>General</legend><div class="control-group"><label for="event_title" class="control-label">Title:</label><div class="controls"><input type="text" id="event_title" placeholder="Enter an Event Title..." value="<%= title %>" class="span3"/></div></div><div class="control-group"><label for="stream_select" class="control-label">Stream:</label><div id="event-stream-wrapper" class="controls"></div></div><div class="control-group"><label for="group_select" class="control-label">Group(s):</label><div id="event-group-wrapper" class="controls"></div></div></fieldset><fieldset><legend>Date and Time</legend><div id="startDate"></div><hr/><div id="endDate"></div></fieldset><fieldset><div id="matchup"></div></fieldset>');Koala.templates.add('event_tr', '<td class="status"></td><td><%= franchise %></td><td><%= title %></td><td><%= starts_at %></td><td class="actionButton"></td>');Koala.templates.add('events_table', '<colgroup span="4"></colgroup><colgroup><col width="1"/></colgroup><thead><th>Status</th><th>Group</th><th>Title</th><th>Starts</th><th>Action</th></thead>');Koala.templates.add('game_action_td_finished', '<i class="icon-ban-circle"></i>');Koala.templates.add('game_action_td_ready', '<button class="btn start_select">Start Game  <i class="icon-play-circle"></i></button>');Koala.templates.add('game_action_td_underway', '<div class="btn-group"><a data-toggle="dropdown" href="#" class="btn btn-primary dropdown-toggle">Choose Winner <i class="icon-user icon-white"></i></a><ul class="dropdown-menu"><li> <a class="teamA_select"><%= teamA.name %></a></li><li><a class="teamB_select"><%= teamB.name %></a></li></ul></div>');Koala.templates.add('game_table', '<colgroup span="5"></colgroup><colgroup><col width="1"/></colgroup><thead><tr><th>#</th><th>Status</th><th>Started</th><th>Ended</th><th>Winner</th><th>Action</th></tr></thead><tbody></tbody>');Koala.templates.add('game_tr', '<td><%= number %></td><td class="status"></td><td><%= starts_at %></td><td><%= ends_at %></td><td><%= winner %></td><td class="action"></td>');Koala.templates.add('group_pill', '<a href="<%= href %>"><%= name %></a>');Koala.templates.add('links_ul', '<% if(prev) {%><li class="previous"><a href="<%= prev %>">&larr; Previous</a></li><% }else{ %><li class="previous disabled"><a>&larr; Previous</a></li><% } %><% if(next) {%><li class="next"><a href="<%= next %>">Next &rarr;</a></li><% }else{ %><li class="next disabled"><a>Next &rarr;</a></li><% } %>');Koala.templates.add('matchup_form', '<legend>Matchup</legend><div class="controls"><div class="alert alert-warning"><button type="button" data-dismiss="alert" class="close">&times;</button><strong>Please Note!</strong> Teams entered into the matchup below must have first been added through the \'Teams\' section!</div></div><div class="control-group"><label class="control-label">Team A Name:</label><div class="controls teamA"></div></div><div class="control-group"><label class="control-label">Team B Name:</label><div class="controls teamB"></div></div><div class="control-group"><label class="control-label">Best Of:</label><div class="controls"><ul id="bestOf" class="nav nav-pills"><% for(var i = 1; i <= 13; i+=2) { %><% if(i === best_of) { %><li class="active"><a><%= i %></a></li><% } else { %><li><a><%= i %></a></li><% } %><% } %></ul></div></div><% if(games && games.length) { %><div class="control-group"><label class="control-label">Games:</label><div class="controls gameTable"></div></div><% } %>');Koala.templates.add('matchup_tr', '<td class="status"></td><td><%= teams[0] && teams[0].name || "TBA" %></td><td><%= teams[1] && teams[1].name || "TBA" %></td><td><%= best_of %></td><td><%= games.length %></td><td class="actionButton"></td>');Koala.templates.add('matchups_table', '<colgroup span="5"></colgroup><colgroup><col width="1"/></colgroup><thead><th>Status</th><th>Team A</th><th>Team B</th><th>Best Of</th><th>Played</th><th>Action</th></thead>');Koala.templates.add('team_form', '<legend>Team</legend><div class="control-group"><label class="control-label">Team Name:</label><div class="controls"><input type="text" placeholder="Enter a team name..." value="<%= name %>" class="span3 teamName_input"/></div></div><div class="control-group"><label class="control-label">Team Logo:</label><div class="controls"><div class="team_image"></div><input type="text" placeholder="Enter an image URL..." value="<%= image_url %>" class="span3 teamLogo_input"/></div></div>');Koala.templates.add('team_li', '<div class="thumbnail"><% if(!image_url) { %><img data-src="holder.js/77x77/auto" alt="" class="pull-left"/><% } else { %><img src="<%= image_url %>" alt="<%= name %>" class="pull-left"/><% } %><h4><%= name %></h4></div>');Koala.templates.add('team_tr', '<td><%= name %></td><td class="actionButton"></td>');Koala.templates.add('teams_table', '<colgroup span="1"></colgroup><colgroup><col width="1"/></colgroup><thead><th>Name</th><th>Action</th></thead>');Koala.templates.add('video_tr', '');Koala.templates.add('warning', '<button type="button" data-dismiss="alert" class="close">&times;</button><strong><%= header %><%= message %></strong>');Koala.models.add('event', Backbone.Model.extend({

	urlRoot: '/api/events',

	defaults: {
		title: "",
		stream: "",
		groups: null,
		starts_at: "",
		ends_at: "",
		matchup: null
	},

	initialize: function() {
		this.matchup = Koala.models.new('matchup', this.get('matchup'));

		//Set matchup values when event values change from external source
		this.on("change:matchup", function() {
			this.matchup.set(this.get('matchup'));
		});

		//Set values on matchup change
		this.listenTo(this.matchup, "change", function() {
			this.set({matchup: this.matchup.attributes}, {silent: true});
		});

		//Set default values
		this.set({matchup: this.matchup.attributes}, {silent:true});
	}

}));Koala.models.add('game', Backbone.Model.extend({
	urlRoot: '/api/games'
}));
Koala.models.add('group', Backbone.Model.extend({
}));Koala.models.add('links', Backbone.Model.extend({

	parse: function(response, options) {
		if(!response) return;
		var attributes = {};
		var links = response.split(",");
		var qs = location.search.replace(/^\?(.*?)(&?page=\d*)(.*)$/gi, "$1$3");
		for(var i = 0, len = links.length; i < len; i++) {
			var page = links[i].match(/page=\d+?/gi).shift();
			var key = links[i].match(/(next|previous|last|first)/gi).shift();
			if(page && key) {
				attributes[key] = location.pathname + (qs ? ("?" + qs + "&") : "?") + page;
			}
		}
		return attributes;
	},

	defaults: {
		next: "",
		prev: "",
		first: "",
		last: ""
	}

}));Koala.models.add('matchup', Backbone.Model.extend({
	urlRoot: '/api/matchups',

	defaults: {
		best_of: 3,
		teams: [null, null],
		games: []
	},

	initialize: function() {
		//Games
		this.games = Koala.collections.new('games', this.attributes.games);

		this.on('change:games', function() {
			this.games.update(this.attributes.games);
		});


		//Teams
		this.teamA = Koala.models.new('team', this.get('teams')[0]);
		this.teamB = Koala.models.new('team', this.get('teams')[1]);

		this.on('change:teams', function() {
			this.teamA.set(this.get('teams')[0], {silent: true});
			this.teamB.set(this.get('teams')[1], {silent: true});
		});

		this.listenTo(this.teamA, 'change', this.setTeams);
		this.listenTo(this.teamB, 'change', this.setTeams);
	},

	setTeams: function() {
		var teams = [];
		teams.push(this.teamA.attributes);
		teams.push(this.teamB.attributes);
		this.set({teams: teams});
	}
}));

Koala.models.add('stream', Backbone.Model.extend({
	
}));Koala.models.add('team', Backbone.Model.extend({
	urlRoot: '/api/teams',

	defaults: {
		name: "",
		image_url: ""
	}
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

}));Koala.views.add('create_delete_button', Backbone.View.extend({

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

}));Koala.views.add('edit_delete_button', Backbone.View.extend({

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

		//Matchup form
		var matchup_form = Koala.views.new('matchup_form', {
			model: this.model.matchup
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
			endDate_form: endDate_form,
			matchup_form: matchup_form
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
		$('#matchup').replaceWith(this.views.matchup_form.render().el);

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

		var Links = Koala.models.new('links');
		this.links_ul = Koala.views.new('links_ul', {
			model: Links
		});

		Collection.fetch({
			data: location.search.replace(/^\?(.*)/gi, '$1')
		})
		.done(function(data, textStatus, jqXHR) {
			var linkHeader = jqXHR.getResponseHeader('link');
			Links.set(Links.parse(linkHeader));
		});
	},

	render: function() {
		this.$el.html(this.template());
		this.$el.append(this.tbody.el);
		this.links_ul.render().$el.insertAfter(this.el);
		return this;
	}

}));Koala.views.add('game_action_td', Backbone.View.extend({

	tagName: "td",

	events: {
		"click .teamA_select" : function() {
			this.model.set('winner', this.matchup.get("teams")[0]);
			this.end();
		},
		"click .teamB_select" : function() {
			this.model.set("winner", this.matchup.get("teams")[1]);
			this.end();
		},
		"click .start_select" : "start"
	},

	initialize: function(options) {
		this.matchup = options.matchup;
        this.model.set('matchup_id', this.matchup.get('id'));
		this.listenTo(this.matchup, "change:teams", this.render);
	},

	render: function() {
		var data = $.extend(true, {}, this.model.attributes);
		data.teamA = this.matchup.get("teams") && this.matchup.get("teams")[0];
		data.teamB = this.matchup.get("teams") && this.matchup.get("teams")[1];

		this.$el.html(this.getTemplate()(data))

		this.delegateEvents();

		return this;
	},

	getTemplate: function() {
		switch(this.model.get('status')) {
			case "underway":
				return Koala.templates.get('game_action_td_underway');

			case "finished":
				return Koala.templates.get('game_action_td_finished');

			default:
				return Koala.templates.get('game_action_td_ready');
		}
	},

	end: function() {
        this.model.set('matchup_id', this.matchup.get('id'));
		this.model.set('ends_at', moment().format());
		this.sync();
	},

	start: function() {
        this.model.set('matchup_id', this.matchup.get('id'));
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

}));
Koala.views.add('game_table', Backbone.View.extend({

	tagName: "table",

	className: "table table-hover",

	template: Koala.templates.get('game_table'),

	initialize: function(options) {
		this.$el.html(this.template());
		this.listenTo(this.collection, 'add', this.addOne);
		this.listenTo(this.collection, 'reset', this.addAll);
		this.matchup = options.matchup;
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

		this.status_span = Koala.views.new('status_span', {
			model: this.model
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
		$('.status', this.el).append(this.status_span.render().el);

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

}));Koala.views.add('links_ul', Backbone.View.extend({

	tagName: "ul",

	className: "pager",

	template: Koala.templates.get('links_ul'),

	initialize: function() {
		this.listenTo(this.model, "change", this.render);
	},

	render: function() {
		this.$el.html(this.template(this.model.attributes));
		return this;
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
			model: this.model.teamA,
			collection: this.Teams
		});

		this.teamB_typeahead = Koala.views.new('team_typeahead', {
			model: this.model.teamB,
			collection: this.Teams
		});

		this.Teams.fetch({
			data: {
				per_page: 5000
			}
		});

		//Games
		this.game_table = Koala.views.new('game_table', {
			collection: this.model.games,
			matchup: this.model
		});

		//Listeners
		this.listenTo(this.model.teamA, 'change', this.save);
		this.listenTo(this.model.teamB, 'change', this.save);
	},

	render: function() {
		this.$el.html(this.template(this.model.attributes));
		$('.teamA', this.el).append(this.teamA_typeahead.render().el);
		$('.teamB', this.el).append(this.teamB_typeahead.render().el);
		$('.gameTable', this.el).append(this.game_table.el);
		return this;
	},

	changeBestOf: function(event) {
		if($(event.currentTarget).hasClass('active')) return;

		//Remove class active
		$('#bestOf li.active', this.el).removeClass('active');
		$(event.currentTarget).addClass('active');

		this.model.set('best_of', $('a', event.currentTarget).html());
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

	initialize: function() {
		this.listenTo(this.model, "change", this.render);
		this.listenTo(this.model, "destroy", this.destroy);

		//Action Button
		this.actionButton = Koala.views.new('edit_delete_button', {
			type: "Matchup",
			href: "/matchups/" + this.model.get('id'),
			model: this.model
		});

		//Status span
		this.status_span = Koala.views.new('status_span', {
			model: this.model
		});
	},

	render: function() {
		this.$el.html(this.template(this.model.attributes));
		$('.actionButton', this.el).append(this.actionButton.render().el);
		$('.status', this.el).append(this.status_span.render().el);
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

		var Links = Koala.models.new('links');
		this.links_ul = Koala.views.new('links_ul', {
			model: Links
		});

		Collection.fetch({
			data: location.search.replace(/^\?(.*)/gi, '$1')
		})
		.done(function(data, textStatus, jqXHR) {
			var linkHeader = jqXHR.getResponseHeader('link');
			Links.set(Links.parse(linkHeader));
		});
	},

	render: function() {
		this.$el.html(this.template());
		this.$el.append(this.tbody.el);
		this.links_ul.render().$el.insertAfter(this.el);
		return this;
	}

}));Koala.views.add('status_span', Backbone.View.extend({
	
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

Koala.views.add('team_form', Backbone.View.extend({

	tagName: 'fieldset',

	template: Koala.templates.get('team_form'),

	events: {
		"keyup .teamName_input" : "setName",
		"keyup .teamLogo_input" : "setLogo"
	},

	initialize: function() {
		this.team_image = Koala.views.new('team_image', {
			model: this.model
		});
	},

	render: function() {
		this.$el.html(this.template(this.model.attributes));
		$('.team_image', this.el).replaceWith(this.team_image.render().el);
		return this;
	},

	setName: function() {
		this.model.set('name', $('.teamName_input', this.el).val());
		this.save();
	},

	setLogo: function() {
		this.model.set('image_url', $('.teamLogo_input', this.el).val());
		this.save();
	},

	save: function() {
		if(this.model.isNew() || !this.model.hasChanged()) return;
		this.model.save();
	}

}));
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
Koala.views.add('team_input', Backbone.View.extend({

	tagName: "input",

	className: "span3",

	attributes: {
		type: "text",
		placeholder: "Enter an existing team's name..."
	},

	events: {
		'change' : 'setTeam',
		'keyup' : 'setTeam'
	},

	initialize: function() {
		this.listenTo(this.collection, 'reset', this.bindTypeahead);
	},

	render: function() {
		this.$el.val(this.model.get('name'));
		return this;
	},

	bindTypeahead: function() {
		this.$el.typeahead({
			source: this.collection.pluck('name')
		});

		//Fill with TBA if empty
		if(this.model.isNew()) {
			var TBA = this.findTeam("TBA");
			if(TBA) {
				this.model.set(TBA, {silent:true});
				this.render();
			}
		}
	},

	setTeam: function() {
		var name = this.$el.val();
		var team = this.findTeam(name);
		if(team) {
			this.model.clear({silent:true});
			this.model.set(team);
		}
		else {
			this.model.clear();
		}
	},

	findTeam: function(name) {
		var found = this.collection.find(function(team) {
			return team.get('name') === name;
		});

		if(!found) return;

		return found.attributes;
	}

}));Koala.views.add('team_li', Backbone.View.extend({

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
Koala.views.add('team_tr', Backbone.View.extend({
	
	tagName: 'tr',

	template: Koala.templates.get('team_tr'),

	initialize: function() {
		this.listenTo(this.model, "change", this.render);
		this.listenTo(this.model, "destroy", this.destroy);

		//Action Button
		this.actionButton = Koala.views.new('edit_delete_button', {
			type: "Team",
			href: "/teams/" + this.model.get('id'),
			model: this.model
		});
	},

	render: function() {
		this.$el.html(this.template(this.model.attributes));
		$('.actionButton', this.el).append(this.actionButton.render().el);
		return this;
	},

	destroy: function() {
		this.remove();
	}

}));Koala.views.add('team_typeahead', Backbone.View.extend({

	className: "team_typeahead",

	initialize: function() {
		this.input = Koala.views.new('team_input', {
			collection: this.collection,
			model: this.model
		});

		this.image = Koala.views.new('team_image', {
			model: this.model
		});

		this.$el.append(this.image.render().el);
		this.$el.append(this.input.render().el);
	},

	render: function() {
		this.image.render();
		this.input.render();
		return this;
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

		var Links = Koala.models.new('links');
		this.links_ul = Koala.views.new('links_ul', {
			model: Links
		});

		Collection.fetch({
			data: location.search.replace(/^\?(.*)/gi, '$1')
		})
		.done(function(data, textStatus, jqXHR) {
			var linkHeader = jqXHR.getResponseHeader('link');
			Links.set(Links.parse(linkHeader));
		});
	},

	render: function() {
		this.$el.html(this.template());
		this.$el.append(this.tbody.el);
		this.links_ul.render().$el.insertAfter(this.el);
		return this;
	}

}));Koala.views.add('teams_ul', Backbone.View.extend({

	tagName: "ul",

	className: "thumbnails",

	initialize: function(options) {

		this.collection = Koala.collections.new('teams');

		var Links = Koala.models.new('links');
		this.links_ul = Koala.views.new('links_ul', {
			model: Links
		});

		this.listenTo(this.collection, 'add', this.addOne);
		this.listenTo(this.collection, 'reset', this.addAll);

		this.collection.fetch({
			data: location.search.replace(/^\?(.*)/gi, '$1')
		})
		.done(function(data, textStatus, jqXHR) {
			var linkHeader = jqXHR.getResponseHeader('link');
			Links.set(Links.parse(linkHeader));
		});
	},

	render: function() {
		this.links_ul.render().$el.insertAfter(this.el);
	},

	addOne: function(model) {
		var view = Koala.views.new('team_li', {model: model});
		this.$el.append(view.render().el);
	},

	addAll: function() {
		this.collection.each(this.addOne, this);
	}

}));
Koala.views.add('warning', Backbone.View.extend({
	className: 'alert alert-info',

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