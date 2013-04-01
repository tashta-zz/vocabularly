var ProfileView = Backbone.View.extend({

	className: 'profile',

	template1: _.template(
						'<span class="userName"><%= username %></span>\
						<a class="logout" href="/logout">/Logout/</a>\
						<div class="nav">Profile</div>\
						<div class="nav"><a href="/dictionary">Dictionary</a></div>\
						<div class="nav"><a href="/practice">Practice</a></div>\
						<table class="profileInfo">\
						<tr><td class="profParam">Collection</td><td class="profVal"><%= collection %>' 
	),

	template2: _.template(
							'</td></tr>\
							<tr><td class="profParam">Best track</td><td class="profVal"><%= best %>' 
	), 

	render: function(){
		return this.$el.html( this.template1(this.model.attributes) + 
													this.writeRight(this.model.get('collection'), 'word') + 
													'</td></tr><tr><td class="profParam">Current track</td><td class="profVal">' + 
													this.countTrack() + 
													this.template2(this.model.attributes) + 
													this.writeRight(this.model.get('best'), 'day') + 
													'</td></tr><tr><td class="profParam">Statistics</td><td class="profVal">' + 
													this.countStat() + '</tr></table>' );
		},

	countStat: function(){
		var right = this.model.get('rightAnswers');
		var wrong = this.model.get('wrongAnswers');
		if (right + wrong === 0){
			right = '_'; 
			wrong = '_';
		} else {
			right = Math.round(right*100/(right+wrong));
			wrong = 100 - right;
		}
		return '<span class="right">' + right + '%</span><span class="wrong">' + wrong + '%</span>';
	}, 

	countTrack: function(){
		if ( (this.model.get('best') === 0) || (new Date().valueOf() - Number(this.model.get('endTrack')) > 86400000) ){
			return '0 days';
		} else {
			var track = Math.ceil( (Number(this.model.get('endTrack')) - Number(this.model.get('startTrack')))/86400000 );
			return track + this.writeRight(track, 'day');
		}
	},

	writeRight: function(num, metrics){
		if (num === 1){
			return ' ' + metrics;
		} else {
			return ' ' + metrics + 's';
		}
	}

});
