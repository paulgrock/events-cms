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

		var self = this;

		for(var i = 0, len = groups.length; i < len; i++) {
			this.collection.each(function(group, j) {
				if(group.attributes.id === groups[i].id) {
					self.el.selectedIndex = j;
					return;
				}
			});
		}
	},

	getSelectedGroups: function() {
		var ret = [];
		var options = this.el.options;
		for(var i = 0, len = options.length; i < len; i++) {
			if(options[i].selected) {
				var g = this.collections.find(function(group) {
					return group.attributes.name === $(options[i]).val();
				});
				if(g) ret.push({id: g.attributes.id});
			}
		}
		return ret;
	},

	onChange: function() {
		this.trigger('change');
	}

}));