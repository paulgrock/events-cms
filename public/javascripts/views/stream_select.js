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

		var self = this;

		this.collection.each(function(stream, i) {
			if(stream.attributes.id === id) {
				self.el.selectedIndex = i;
				return;
			}
		});
	},

	getSelectedStream: function() {
		var name = $(this.$el.selectedOptions[0]).val();
		var selected = this.collection.find(function(stream) {
			return stream.attributes.name === name;
		});

		if(selected) return {id: selected.attributes.id};
	},

	onChange: function() {
		this.trigger('change');
	}

}));