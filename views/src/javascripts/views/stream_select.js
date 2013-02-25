Koala.views.add('stream_select', Backbone.View.extend({
	
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

}));