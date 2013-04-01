var LoginFormView = Backbone.View.extend({

	events: {
		'submit .loginForm' : 'checkUser'
	},

	initialize: function(){
		this.$el.append("<form class='loginForm'>\
										<p class='error regError'></p>\
										<label>Enter your email</label>\
										<input class='enteredEmail' type='text' /><br><br>\
										<label>Enter your password</label>\
										<input class='enteredPassword' type='password' /><br><br>\
										<input class='subBut' type='submit' />\
										</form>");
	},

	render: function(){
		return this.$el;
	},

	checkUser: function(e){
		e.preventDefault();
		var entEmail = $('.enteredEmail').val();
		var entPassword = $('.enteredPassword').val();
		checkPassword({email: entEmail, password: entPassword});
	}

});