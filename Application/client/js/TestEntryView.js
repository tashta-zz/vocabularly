var TestEntryView = Backbone.View.extend({

	className: 'variant',

	events: {
		'click': 'check'
	},

	render: function(){
		this.firstChoice = true;
		return this.$el.html( this.model.get('translation') );
	},

	check: function(){
		if (this.model.get('right')){
			this.$el.css('background-color', 'rgb(209, 252, 236)');
			var model = this.model;
			setTimeout(function(){
				model.unset('right');
				model.trigger('change');
			}, 700);
			var isRight = true;
		} else {
			this.$el.css('background-color', 'red');
			var isRight = false;
		}
		if (this.firstChoice){
			var time = new Date().valueOf()+'';
			updateStatistics( $('.pracWord').text(), isRight, time, function(message){});
			this.firstChoice = false;
		}
	}

});