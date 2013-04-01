var MainpageView = Backbone.View.extend({

	events: {
		"click .openSignupForm" : "addSignupForm",
		"click .openLoginForm" : "AddLoginForm"
	},

	initialize: function(){
		return this.$el;
	},

	render: function(){
		return this.$el;
	},

	addSignupForm: function(e){
		this.$('.registrationForm').html('');
		var newSignupForm = new SignupFormView();
		this.$('.registrationForm').html( newSignupForm.render() );
	},

	AddLoginForm: function(e){
		this.$('.registrationForm').html('');
		var newLoginForm = new LoginFormView();
		$('.registrationForm').html( newLoginForm.render() );
	}

});
