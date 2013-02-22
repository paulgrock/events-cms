(function(){if(!window.Koala){var n={},t={},e={},o={};window.Koala={collections:{get:function(n){return t[n]},add:function(n,e){t[n]=e},"new":function(n,e,o){return t[n]?new t[n](e,o):void 0}},models:{get:function(t){return n[t]},add:function(t,e){n[t]=e},"new":function(t,e,o){return n[t]?new n[t](e,o):void 0}},views:{get:function(n){return e[n]},add:function(n,t){e[n]=t},"new":function(n,t){return e[n]?new e[n](t):void 0}},templates:{add:function(n,t){o[n]=_.template(t)},get:function(n){return o[n]}}}}})(jQuery,Backbone);Koala.templates.add("confirm_modal",'<div class="modal-header"><button type="button" data-dismiss="modal" aria-hidden="true" class="close">x</button><h2><%= action %></h2></div><div class="modal-body"><div class="lead"><%= message %></div><p class="text-info">&quot;<%= snippet %>&quot;</p></div><div class="modal-footer"><button data-dismiss="modal" aria-hidden="true" class="btn cancel">Cancel</button><button class="btn btn-danger confirm">Confirm</button></div>');Koala.templates.add("date_form",'<div class="control-group"><label class="control-label"><%= type %> Date:</label><div class="controls"><div class="input-prepend input-append"><span class="span2 add-on">MM/DD/YYYY</span><input type="text" placeholder="Enter a start date..." value="<%= data.date %>" class="span2 date"/><button type="button" class="btn todayBtn">Today</button></div></div></div><div class="control-group"><label class="control-label"><%= type %> Time:</label><div class="controls"><div class="input-prepend input-append"><span class="span2 add-on">HH:MM</span><input type="text" placeholder="HH:MM" value="<%= data.time %>" class="span1 time"/><button type="button" class="btn nowBtn">Now</button></div><span class="help-inline">(24hr)</span><div class="timeWarning"><div class="span4"></div></div></div></div>');Koala.templates.add("event_form",'<fieldset><legend>General</legend><div class="control-group"><label for="event_title" class="control-label">Title:</label><div class="controls"><input type="text" id="event_title" placeholder="Enter an Event Title..." value="<%= title %>" class="span3"/></div></div><div class="control-group"><label for="stream_select" class="control-label">Stream:</label><div id="event-stream-wrapper" class="controls"></div></div><div class="control-group"><label for="group_select" class="control-label">Group(s):</label><div id="event-group-wrapper" class="controls"></div></div></fieldset><fieldset><legend>Date and Time</legend><div id="startDate"></div><hr/><div id="endDate"></div></fieldset>');Koala.templates.add("event_tr",'<td><span class=\'label <% switch(status) { case \'Pending\':  %>label-inverse<%  break;   case \'Underway\':  %>label-important<%  break;   case \'Starting Soon\':  %>label-warning<%  break; }%>\'><%= status %></span></td><td><%= franchise %></td><td><%= title %></td><td><%= starts_at %></td><td><div class="btn-group"><a href="/events/<%= id %>" class="btn">Edit</a><button data-toggle="dropdown" class="btn dropdown-toggle"><span class="caret"></span></button><ul role="menu" class="dropdown-menu"><li><a class="delete">Delete</a></li></ul></div></td>');Koala.templates.add("events_table",'<colgroup span="4"></colgroup><colgroup><col width="1"/></colgroup><thead><th>Status</th><th>Franchise</th><th>Title</th><th>Starts</th><th>Action</th></thead>');Koala.templates.add("game_action_td_finished","-");Koala.templates.add("game_action_td_ready",'<button class="btn start_select">Start Game</button>');Koala.templates.add("game_action_td_underway",'<div class="btn-group"><a data-toggle="dropdown" href="#" class="btn btn-primary dropdown-toggle">Choose Winner <span class="caret"></span></a><ul class="dropdown-menu"><li> <a class="teamA_select"><%= teamA.name %></a></li><li><a class="teamB_select"><%= teamB.name %></a></li></ul></div>');Koala.templates.add("game_table",'<colgroup span="5"></colgroup><colgroup><col width="1"/></colgroup><thead><tr><th>#</th><th>Status</th><th>Started</th><th>Ended</th><th>Winner</th><th>Action</th></tr></thead><tbody></tbody>');Koala.templates.add("game_tr","<td><%= number %></td><td><span class='label <%   switch(status) {   case 'underway':    %>label-info<%    break;       case 'ready':    %>label-warning<%    break;   }  %>'><%= status.toUpperCase() %></span></td><td><%= starts_at %></td><td><%= ends_at %></td><td><%= winner %></td><td class=\"action\"></td>");Koala.templates.add("group_pill",'<a href="<%= href %>"><%= name %></a>');Koala.templates.add("links_ul",'<% if(prev) {%><li class="previous"><a href="<%= prev %>">&larr; Previous</a></li><% }else{ %><li class="previous disabled"><a>&larr; Previous</a></li><% } %><% if(next) {%><li class="next"><a href="<%= next %>">Next &rarr;</a></li><% }else{ %><li class="next disabled"><a>Next &rarr;</a></li><% } %>');Koala.templates.add("matchup_form",'<legend>Matchup</legend><div class="controls"><div class="alert alert-info"><button type="button" data-dismiss="alert" class="close">&times;</button><strong>Please Note!</strong> Teams entered into the matchup below must have first been added through the \'Team Creation\' process!</div></div><div class="control-group"><label class="control-label">Team A Name:</label><div class="controls teamA"></div></div><div class="control-group"><label class="control-label">Team B Name:</label><div class="controls teamB"></div></div><div class="control-group"><label class="control-label">Best Of:</label><div class="controls"><ul id="bestOf" class="nav nav-pills"><% for(var i = 1; i <= 13; i+=2) { %> <% if(i === best_of) { %>  <li class="active"><a><%= i %></a></li> <% } else { %>  <li><a><%= i %></a></li> <% } %><% } %></ul></div></div><% if(games && games.length) { %><div class="control-group"><label class="control-label">Games:</label><div class="controls gameTable"></div></div><% } %>');Koala.templates.add("matchup_tr",'<td><span class="label label-success"><%= status %></span></td><td><%= teams[0] && teams[0].name || "TBA" %></td><td><%= teams[1] && teams[1].name || "TBA" %></td><td><%= best_of %></td><td><%= games.length %></td><td><div class="btn-group"><a href="/matchups/<%= id %>" class="btn">Edit</a><button data-toggle="dropdown" class="btn dropdown-toggle"><span class="caret"></span></button><ul role="menu" class="dropdown-menu"><li><a class="delete">Delete</a></li></ul></div></td>');Koala.templates.add("matchups_table",'<colgroup span="5"></colgroup><colgroup><col width="1"/></colgroup><thead><th>Status</th><th>Team A</th><th>Team B</th><th>Best Of</th><th>Played</th><th>Action</th></thead>');Koala.templates.add("team_form",'<legend>Team</legend><div class="control-group"><label class="control-label">Team Name:</label><div class="controls"><input type="text" placeholder="Enter a team name..." value="<%= name %>" class="teamName_input"/></div></div><div class="control-group"><label class="control-label">Team Logo:</label><div class="controls"><input type="text" placeholder="Enter an image URL..." value="<%= image_url %>" class="teamLogo_input"/></div></div>');Koala.templates.add("team_tr",'<td><%= name %></td><td><div class="btn-group"><a href="/teams/<%= id %>" class="btn">Edit</a><button data-toggle="dropdown" class="btn dropdown-toggle"><span class="caret"></span></button><ul role="menu" class="dropdown-menu"><li><a class="delete">Delete</a></li></ul></div></td>');Koala.templates.add("teams_table",'<colgroup span="1"></colgroup><colgroup><col width="1"/></colgroup><thead><th>Name</th><th>Action</th></thead>');Koala.templates.add("video_tr","");Koala.templates.add("warning",'<button type="button" data-dismiss="alert" class="close">&times;</button><strong><%= header %><%= message %></strong>');Koala.models.add("event",Backbone.Model.extend({urlRoot:"/api/events",defaults:{title:"",stream:"",groups:null,starts_at:"",ends_at:"",matchup:null}}));Koala.models.add("game",Backbone.Model.extend({urlRoot:"/api/games"}));Koala.models.add("group",Backbone.Model.extend({}));Koala.models.add("links",Backbone.Model.extend({parse:function(a){if(a){for(var t={},e=a.split(","),l=location.search.replace(/^\?(.*?)(&?page=\d*)(.*)$/gi,"$1$3"),s=0,o=e.length;o>s;s++){var d=e[s].match(/page=\d+?/gi).shift(),n=e[s].match(/(next|previous|last|first)/gi).shift();d&&n&&(t[n]=location.pathname+(l?"?"+l+"&":"?")+d)}return t}},defaults:{next:"",prev:"",first:"",last:""}}));Koala.models.add("matchup",Backbone.Model.extend({urlRoot:"/api/matchups",defaults:{best_of:3,teams:[{name:"TBA"},{name:"TBA"}],games:[]},initialize:function(){this.games=Koala.collections.new("games",this.attributes.games),this.on("change:games",function(){this.games.update(this.attributes.games)})}}));Koala.models.add("stream",Backbone.Model.extend({}));Koala.models.add("team",Backbone.Model.extend({urlRoot:"/api/teams",defaults:{image_url:""}}));Koala.models.add("warning",Backbone.Model.extend({defaults:{header:"",message:""}}));Koala.collections.add("events",Backbone.Collection.extend({model:Koala.models.get("event"),url:"/api/events"}));Koala.collections.add("games",Backbone.Collection.extend({model:Koala.models.get("game"),url:"/api/games"}));Koala.collections.add("groups",Backbone.Collection.extend({model:Koala.models.get("group"),url:"/api/groups"}));Koala.collections.add("matchups",Backbone.Collection.extend({model:Koala.models.get("matchup"),url:"/api/matchups"}));Koala.collections.add("streams",Backbone.Collection.extend({model:Koala.models.get("stream"),url:"/api/streams"}));Koala.collections.add("teams",Backbone.Collection.extend({model:Koala.models.get("team"),url:"/api/teams"}));Koala.views.add("confirm_delete_modal",Backbone.View.extend({tagName:"div",className:"modal hide fade",attributes:{role:"dialog","aria-hidden":"true"},events:{"click .confirm":function(){this.model.destroy()}},template:Koala.templates.get("confirm_modal"),initialize:function(){var a=this;this.listenTo(this.model,"change",this.render),this.listenTo(this.model,"destroy",this.hide),this.$el.on("hidden",function(){a.destroy()}),$("body").append(this.render().el),$(this.$el).modal()},render:function(){return this.$el.html(this.template(this.options.modal)),this},hide:function(){this.$el.modal("hide")},destroy:function(){this.remove()}}));Koala.views.add("date_form",Backbone.View.extend({events:{"change .date, .time":"onChange","keyup .date, .time":"onChange","click .todayBtn":function(){$(".date",this.el).val(moment().format("L")).trigger("change")},"click .nowBtn":function(){$(".time",this.el).val(moment().format("HH:mm")).trigger("change")}},template:Koala.templates.get("date_form"),initialize:function(){this.Warning=Koala.models.new("warning"),this.warning_alert=Koala.views.new("warning",{model:this.Warning})},render:function(){return this.$el.html(this.template({data:this.initialValues(),type:this.options.type||""})),$(".date",this.el).datepicker({numberOfMonths:3}),$(".nowBtn, .todayBtn",this.el).tooltip({title:"Based on your computer's clock."}),$(".timeWarning .span4",this.el).append(this.warning_alert.el),this.warning(),this.delegateEvents(),this},initialValues:function(){var t=Date.parse(this.model.attributes[this.options.dateKey]);return{date:isNaN(t)?"":moment(t).format("L"),time:isNaN(t)?"":moment(t).format("HH:mm")}},generateDate:function(){var t=$(".date",this.el).val(),e=$(".time",this.el).val();return t&&e?moment(t+e,"MM-DD-YYYYTHH:mm").format():0/0},warning:function(){var t=this.generateDate();t?this.Warning.set({header:this.options.warningHeader,message:moment(t).calendar()}):this.Warning.set(this.Warning.defaults)},onChange:function(){this.trigger("change"),this.warning()}}));Koala.views.add("event_form",Backbone.View.extend({events:{"keyup #event_title":"setTitle"},template:Koala.templates.get("event_form"),initialize:function(){var e=Koala.collections.new("streams"),t=Koala.views.new("stream_select",{collection:e});e.fetch({fields:"id,name"});var a=Koala.collections.new("groups"),s=Koala.views.new("group_select",{collection:a});a.fetch({data:{fields:"id,name"}});var l=Koala.views.new("date_form",{model:this.model,dateKey:"starts_at",warningHeader:"Starting: ",type:"Start"}),o=Koala.views.new("date_form",{model:this.model,dateKey:"ends_at",warningHeader:"Ending: ",type:"End"});this.collections={streams:e,groups:a},this.views={stream_select:t,group_select:s,startDate_form:l,endDate_form:o},this.listenTo(e,"reset",this.prefill.setStreamIndex),this.listenTo(a,"reset",this.prefill.setGroupIndex),this.listenTo(t,"change",this.setStream),this.listenTo(s,"change",this.setGroups),this.listenTo(l,"change",this.setStarts_at),this.listenTo(o,"change",this.setEnds_at),this.model.isNew()&&this.listenTo(e,"reset",this.setStream)},render:function(){this.$el.html(this.template(this.model.attributes)),$("#event-stream-wrapper").append(this.views.stream_select.render().el),$("#event-group-wrapper").append(this.views.group_select.render().el),$("#startDate").replaceWith(this.views.startDate_form.render().el),$("#endDate").replaceWith(this.views.endDate_form.render().el);var e=this;$(this.views.endDate_form.el).off("click",".todayBtn"),$(".todayBtn",this.views.endDate_form.el).click(function(){var t=$(".date",e.views.startDate_form.el).val();$(".date",e.views.endDate_form.el).val(t).trigger("change")}).html("Same Day");for(var t in this.prefill)this.prefill[t].call(this);return this},prefill:{setStreamIndex:function(){this.views.stream_select.setIndex(this.model.attributes.stream.id)},setGroupIndex:function(){this.views.group_select.setIndex(this.model.attributes.groups)}},setTitle:function(){var e=$("#event_title",this.el).val();this.model.set({title:e}),this.save()},setStream:function(){var e=this.views.stream_select.getSelectedStream();this.model.set({stream:e}),this.save()},setGroups:function(){var e=this.views.group_select.getSelectedGroups();this.model.set({groups:e}),this.save()},setStarts_at:function(){var e=this.views.startDate_form.generateDate();this.model.set({starts_at:e}),this.save()},setEnds_at:function(){var e=this.views.endDate_form.generateDate();this.model.set({ends_at:e}),this.save()},save:function(){!this.model.isNew()&&this.model.hasChanged()&&this.model.save()}}));Koala.views.add("event_tr",Backbone.View.extend({tagName:"tr",template:Koala.templates.get("event_tr"),events:{"click .delete":function(){Koala.views.new("confirm_delete_modal",{model:this.model,modal:{action:"Confirm Event Deletion.",message:"Are you sure you want to permanently delete this event?",snippet:this.model.attributes.title}})}},initialize:function(){this.listenTo(this.model,"change",this.render),this.listenTo(this.model,"destroy",this.destroy),this.data={};for(var e in this.model.attributes)this.model.attributes.hasOwnProperty(e)&&(this.data[e]=this.model.attributes[e]);this.data.starts_at=moment(this.model.attributes.starts_at).calendar(),this.data.franchise=this.model.attributes.groups[0]&&this.model.attributes.groups[0].name,this.data.status=this.status(this.model.attributes.starts_at,this.model.attributes.ends_at)},render:function(){return this.$el.html(this.template(this.data)),this},destroy:function(){this.remove()},status:function(e,t){var a=(new Date).getTime(),s=Date.parse(t),l=Date.parse(e);return a>s?"Complete":a>l?"Underway":a+18e5>l?"Starting Soon":"Pending"}}));Koala.views.add("events_table",Backbone.View.extend({tagName:"table",template:Koala.templates.get("events_table"),className:"table table-hover",initialize:function(){var e=Koala.collections.new("events");this.tbody=Koala.views.new("tbody",{collection:e,rowView:"event_tr"});var t=Koala.models.new("links");this.links_ul=Koala.views.new("links_ul",{model:t}),e.fetch({data:location.search.replace(/^\?(.*)/gi,"$1")}).done(function(e,a,s){var l=s.getResponseHeader("link");t.set(t.parse(l))})},render:function(){return this.$el.html(this.template()),this.$el.append(this.tbody.el),this.links_ul.render().$el.insertAfter(this.el),this}}));Koala.views.add("game_action_td",Backbone.View.extend({tagName:"td",events:{"click .teamA_select":function(){this.model.set("winner",this.matchup.teams[0]),this.end()},"click .teamB_select":function(){this.model.set("winner",this.matchup.teams[1]),this.end()},"click .start_select":"start"},initialize:function(t){this.matchup=t.matchup},render:function(){var t=$.extend(!0,{},this.model.attributes);return t.teamA=this.matchup.teams&&this.matchup.teams[0],t.teamB=this.matchup.teams&&this.matchup.teams[1],this.$el.html(this.getTemplate()(t)),this.delegateEvents(),this},getTemplate:function(){switch(this.model.attributes.status){case"underway":return Koala.templates.get("game_action_td_underway");case"finished":return Koala.templates.get("game_action_td_finished");default:return Koala.templates.get("game_action_td_ready")}},end:function(){this.model.set("ends_at",moment().format()),this.sync()},start:function(){this.model.set("starts_at",moment().format()),this.sync()},sync:function(){this.model.save(null,{success:function(t){t.fetch()}})}}));Koala.views.add("game_table",Backbone.View.extend({tagName:"table",className:"table table-hover",template:Koala.templates.get("game_table"),initialize:function(t){this.listenTo(this.collection,"add",this.addOne),this.listenTo(this.collection,"reset",this.addAll),this.matchup=t.matchup},render:function(){return this.$el.html(this.template()),this.addAll(),this},addOne:function(t){var e=Koala.views.new("game_tr",{model:t,matchup:this.matchup});$("tbody",this.el).append(e.render().el)},addAll:function(){this.collection.each(this.addOne,this)}}));Koala.views.add("game_tr",Backbone.View.extend({tagName:"tr",template:Koala.templates.get("game_tr"),initialize:function(t){this.action=Koala.views.new("game_action_td",{model:this.model,matchup:t.matchup}),this.listenTo(this.model,"change",this.render)},render:function(){var t=$.extend(!0,{},this.model.attributes);return t.starts_at=t.starts_at?moment(t.starts_at).calendar():"-",t.ends_at=t.ends_at?moment(t.ends_at).calendar():"-",t.winner=t.winner&&t.winner.name||"-",this.$el.html(this.template(t)),$(".action",this.el).replaceWith(this.action.render().el),this}}));Koala.views.add("group_option",Backbone.View.extend({tagName:"option",render:function(){return this.el.text=this.model.attributes.name,this.el.value=this.model.attributes.id,this}}));Koala.views.add("group_pill",Backbone.View.extend({tagName:"li",template:Koala.templates.get("group_pill"),initialize:function(){var t=this.model.get("active");t&&this.$el.addClass("active")},render:function(){var t=this.model.get("slug");return t?this.model.set("href",location.pathname+"?group="+this.model.get("slug")):this.model.set("href",location.pathname),this.$el.html(this.template(this.model.attributes)),this}}));Koala.views.add("group_pills",Backbone.View.extend({tagName:"ul",className:"nav nav-pills",initialize:function(){this.listenTo(this.collection,"reset",this.addAll)},addOne:function(t){var e=Koala.views.new("group_pill",{model:t});this.$el.append(e.render().el)},addAll:function(){var t=Koala.models.new("group",{name:"All"});this.collection.add(t,{silent:!0,at:0});var e=location.search.replace(/^\?.*group=([^&]*).*$/gi,"$1");if(e){var a=this.collection.find(function(t){return t.get("slug")===e});a&&a.set("active",!0)}else t.set("active",!0);this.collection.each(this.addOne,this)}}));Koala.views.add("group_select",Backbone.View.extend({tagName:"select",className:"span3",id:"group_select",attributes:{multiple:"multiple"},events:{change:"onChange"},initialize:function(){this.listenTo(this.collection,"reset",this.addAll)},addOne:function(e){var t=Koala.views.new("group_option",{model:e});this.$el.append(t.render().el)},addAll:function(){this.collection.each(this.addOne,this)},setIndex:function(e){if(e&&e.length){for(var t={},a=0,s=e.length;s>a;a++)t[e[a].id]=e[a].name;for(var a=0,s=this.el.options.length;s>a;a++){var l=this.el.options[a];t[l.value]&&(l.selected=!0)}}},getSelectedGroups:function(){for(var e=[],t=this.el.options,a=0,s=t.length;s>a;a++)t[a].selected&&e.push({id:t[a].value});return e},onChange:function(){this.trigger("change")}}));Koala.views.add("links_ul",Backbone.View.extend({tagName:"ul",className:"pager",template:Koala.templates.get("links_ul"),initialize:function(){this.listenTo(this.model,"change",this.render)},render:function(){return this.$el.html(this.template(this.model.attributes)),this}}));Koala.views.add("matchup_form",Backbone.View.extend({tagName:"fieldset",events:{"click #bestOf li":"changeBestOf"},template:Koala.templates.get("matchup_form"),initialize:function(){this.Teams=Koala.collections.new("teams"),this.teamA_typeahead=Koala.views.new("team_typeahead",{collection:this.Teams}),this.teamB_typeahead=Koala.views.new("team_typeahead",{collection:this.Teams}),this.Teams.fetch({data:{fields:"id,name",per_page:1e3}}),this.listenTo(this.teamA_typeahead,"change",this.changeTeams),this.listenTo(this.teamB_typeahead,"change",this.changeTeams),this.model.isNew()&&this.listenTo(this.Teams,"reset",this.changeTeams),this.game_table=Koala.views.new("game_table",{collection:this.model.games,matchup:this.model.attributes})},render:function(){return this.$el.html(this.template(this.model.attributes)),$(".teamA",this.el).append(this.teamA_typeahead.el),$(".teamB",this.el).append(this.teamB_typeahead.el),this.fillTeams(),this.model.games.length&&$(".gameTable",this.el).append(this.game_table.render().el),this},fillTeams:function(){var e=this.model.get("teams"),t=e[0],a=e[1];this.teamA_typeahead.setValue(t&&t.name||"TBA"),this.teamB_typeahead.setValue(a&&a.name||"TBA"),t&&a||this.changeTeams()},changeBestOf:function(e){$(e.currentTarget).hasClass("active")||($("#bestOf li.active",this.el).removeClass("active"),$(e.currentTarget).addClass("active"),this.model.set("best_of",$("a",e.currentTarget).html()),this.save())},changeTeams:function(){var e=[];e.push(this.teamA_typeahead.getTeam()),e.push(this.teamB_typeahead.getTeam()),this.model.set("teams",e),this.save()},save:function(){!this.model.isNew()&&this.model.hasChanged()&&this.model.save()}}));Koala.views.add("matchup_tr",Backbone.View.extend({tagName:"tr",template:Koala.templates.get("matchup_tr"),events:{"click .delete":function(){Koala.views.new("confirm_delete_modal",{model:this.model,modal:{action:"Confirm Matchup Deletion.",message:"Are you sure you want to permanently delete this matchup?",snippet:this.model.attributes.title}})}},initialize:function(){this.listenTo(this.model,"change",this.render),this.listenTo(this.model,"destroy",this.destroy)},render:function(){return this.$el.html(this.template(this.model.attributes)),this},destroy:function(){this.remove()}}));Koala.views.add("matchups_table",Backbone.View.extend({tagName:"table",template:Koala.templates.get("matchups_table"),className:"table table-hover",initialize:function(){var e=Koala.collections.new("matchups");this.tbody=Koala.views.new("tbody",{collection:e,rowView:"matchup_tr"});var t=Koala.models.new("links");this.links_ul=Koala.views.new("links_ul",{model:t}),e.fetch({data:location.search.replace(/^\?(.*)/gi,"$1")}).done(function(e,a,s){var l=s.getResponseHeader("link");t.set(t.parse(l))})},render:function(){return this.$el.html(this.template()),this.$el.append(this.tbody.el),this.links_ul.render().$el.insertAfter(this.el),this}}));Koala.views.add("stream_option",Backbone.View.extend({tagName:"option",render:function(){return this.el.text=this.model.attributes.name,this.el.value=this.model.attributes.id,this}}));Koala.views.add("stream_select",Backbone.View.extend({tagName:"select",className:"span3",id:"stream_select",events:{change:"onChange"},initialize:function(){this.listenTo(this.collection,"reset",this.addAll)},addOne:function(e){var t=Koala.views.new("stream_option",{model:e});this.$el.append(t.render().el)},addAll:function(){this.collection.each(this.addOne,this)},setIndex:function(e){if(e)for(var t=0,a=this.el.options.length;a>t;t++){var s=this.el.options[t];if(s.value===e){s.selected=!0;break}}},getSelectedStream:function(){var e=$(this.el.selectedOptions[0]).val();if(e)return{id:e}},onChange:function(){this.trigger("change")}}));Koala.views.add("tbody",Backbone.View.extend({tagName:"tbody",initialize:function(e){this.listenTo(this.collection,"add",this.addOne),this.listenTo(this.collection,"reset",this.addAll),this.rowView=e.rowView},addOne:function(e){var t=Koala.views.new(this.rowView,{model:e});this.$el.append(t.render().el)},addAll:function(){this.collection.each(this.addOne,this)}}));Koala.views.add("team_form",Backbone.View.extend({tagName:"fieldset",template:Koala.templates.get("team_form"),events:{"keyup .teamName_input":"setName","keyup .teamLogo_input":"setLogo"},render:function(){return this.$el.html(this.template(this.model.attributes)),this},setName:function(){this.model.set("name",$(".teamName_input",this.el).val()),this.save()},setLogo:function(){this.model.set("image_url",$(".teamLogo_input",this.el).val()),this.save()},save:function(){!this.model.isNew()&&this.model.hasChanged()&&this.model.save()}}));Koala.views.add("team_tr",Backbone.View.extend({tagName:"tr",template:Koala.templates.get("team_tr"),events:{"click .delete":function(){Koala.views.new("confirm_delete_modal",{model:this.model,modal:{action:"Confirm Team Deletion.",message:"Are you sure you want to permanently delete this team?",snippet:this.model.attributes.name}})}},initialize:function(){this.listenTo(this.model,"change",this.render),this.listenTo(this.model,"destroy",this.destroy)},render:function(){return this.$el.html(this.template(this.model.attributes)),this},destroy:function(){this.remove()}}));Koala.views.add("team_typeahead",Backbone.View.extend({tagName:"input",className:"span3 team_typeahead",attributes:{type:"text",placeholder:"Enter a team name..."},events:{change:"onChange",keyup:"onChange"},initialize:function(){this.listenTo(this.collection,"reset",this.bindTypeahead)},bindTypeahead:function(){this.$el.typeahead({source:this.collection.pluck("name")})},onChange:function(){this.trigger("change")},setValue:function(e){this.$el.val(e)},getTeam:function(){var e=this.$el.val(),t=this.collection.find(function(t){return t.get("name")===e});return t?{id:t.get("id")}:void 0}}));Koala.views.add("teams_table",Backbone.View.extend({tagName:"table",template:Koala.templates.get("teams_table"),className:"table table-hover",initialize:function(){var e=Koala.collections.new("teams");this.tbody=Koala.views.new("tbody",{collection:e,rowView:"team_tr"});var t=Koala.models.new("links");this.links_ul=Koala.views.new("links_ul",{model:t}),e.fetch({data:location.search.replace(/^\?(.*)/gi,"$1")}).done(function(e,a,s){var i=s.getResponseHeader("link");t.set(t.parse(i))})},render:function(){return this.$el.html(this.template()),this.$el.append(this.tbody.el),this.links_ul.render().$el.insertAfter(this.el),this}}));Koala.views.add("warning",Backbone.View.extend({className:"alert",template:Koala.templates.get("warning"),initialize:function(){this.listenTo(this.model,"change",this.render),this.render()},render:function(){""===this.model.attributes.header?this.$el.hide():this.$el.show(),this.$el.html(this.template(this.model.attributes))}}));