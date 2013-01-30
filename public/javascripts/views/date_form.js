Koala.views.add('date_form', Backbone.View.extend({

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

}));