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


})(jQuery, Backbone);