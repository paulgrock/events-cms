Koala.views.add('group_select', Backbone.View.extend({
	
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

}));