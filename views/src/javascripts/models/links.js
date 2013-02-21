Koala.models.add('links', Backbone.Model.extend({

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

}));