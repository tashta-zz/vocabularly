var SignupFormView = Backbone.View.extend({

	events: {
		'submit .signupForm' : 'addNewUser',
	},

	initialize: function(){
		this.$el.append("<form class='signupForm'>\
										<p class='error regError'></p>\
										<label>Enter your name</label><input class='newName' type='text' /><p class='error nameError'></p>\
										<label>Enter your email</label><input class='newEmail' type='text' /><p class='error emailError'></p>\
										<label>Enter your password</label><input class='newPassword' type='password' /><p class='error passwordError'></p>\
										<label>Submit your password</label><input class='submitPassword' type='password' /><p class='error subPasError'></p>\
										<label>Choose your native language</label>\
										<select class='natLang'>"
										+ this.langOptions +
										"</select><p class='error naLanError'></p>\
										<label>Choose the language that you want to practice</label>\
										<select class='forLang'>"
										+ this.langOptions +
										"</select><p class='error foLanError'></p>\
										<input class='subBut' type='submit' />\
										</form>");
	},

	render: function(){
		return this.$el;
	},

	validate: function( userData ){
		var formIsValid = true;
		if ( !(userData.username.length) ){
			$('.nameError').text('Enter your name.');
			formIsValid = false;
		}
		if ( !(/\w{1,15}@[a-z]{1,10}\.[a-z]{1,5}/.test(userData.email)) ) {
			$('.emailError').text('Email is invalid.');
			formIsValid = false;
		}
		if ( !(/([a-zA-Z]|\d){4,10}/.test(userData.password)) ){
			$('.passwordError').text('Password should contain of 4 to 10 digits or letters.');
			formIsValid = false;
		}
		if ( userData.password !== userData.subPas ){
			$('.subPasError').text('Passwords do not match.');
		}
		if ( userData.nativeLanguage === "Not selected" ){
			$('.naLanError').text('Choose a language.');
			formIsValid = false;
		}
		if ( userData.foreignLanguage === "Not selected" ){
			$('.foLanError').text('Choose a language.');
			formIsValid = false;
		}
		return formIsValid;
	},

	addNewUser: function(e){
		e.preventDefault();
		var userData = {};
		userData.username = $('.newName').val();
		userData.email = $('.newEmail').val();
		userData.password = $('.newPassword').val();
		userData.subPas = $('.submitPassword').val();
		userData.nativeLanguage = this.languages[$('.natLang').val()];
		userData.foreignLanguage = this.languages[$('.forLang').val()];
		if ( this.validate(userData) ){
			addUser(userData);
		};
	},

	langOptions: "<option>Not selected</option>\
								<option>Afrikaans</option><option>Albanian</option><option>Arabic</option><option>Azerbaijani</option>\
								<option>Basque</option><option>Bengali</option><option>Belarusian</option><option>Bulgarian</option>\
								<option>Catalan</option><option>Chinese Simplified</option><option>Chinese Traditional</option><option>Croatian</option><option>Czech</option>\
								<option>Danish</option><option>Dutch</option>\
								<option>English</option><option>Esperanto</option><option>Estonian</option>\
								<option>Filipino</option><option>Finnish</option><option>French</option>\
								<option>Galician</option><option>Georgian</option><option>German</option><option>Greek</option><option>Gujarati</option>\
								<option>Haitian Creole</option><option>Hebrew</option><option>Hindi</option><option>Hungarian</option>\
								<option>Icelandic</option><option>Indonesian</option><option>Irish</option><option>Italian</option>\
								<option>Japanese</option>\
								<option>Kannada</option><option>Korean</option>\
								<option>Latin</option><option>Latvian</option><option>Lithuanian</option>\
								<option>Macedonian</option><option>Malay</option><option>Maltese</option>\
								<option>Norwegian</option>\
								<option>Persian</option><option>Polish</option><option>Portuguese</option>\
								<option>Romanian</option><option>Russian</option>\
								<option>Serbian</option><option>Slovak</option><option>Slovenian</option><option>Spanish</option><option>Swahili</option><option>Swedish</option>\
								<option>Tamil</option><option>Telugu</option><option>Thai</option><option>Turkish</option>\
								<option>Ukrainian</option><option>Urdu</option>\
								<option>Vietnamese</option>\
								<option>Welsh</option>\
								<option>Yiddish</option>",

	languages: {
		'Not selected' : 'Not selected',
		'Afrikaans' : 'af',
		'Albanian' : 'sq',
		'Arabic' : 'ar',
		'Azerbaijani' : 'az',
		'Basque' : 'eu',
		'Bengali' : 'bn',
		'Belarusian' : 'be',
		'Bulgarian' : 'bg',
		'Catalan' : 'ca',
		'Chinese Simplified' : 'zh-CN',
		'Chinese Traditional' : 'zh-TW',
		'Croatian' : 'hr',
		'Czech' : 'cs',
		'Danish' : 'da',
		'Dutch' : 'nl',
		'English' : 'en',
		'Esperanto' : 'eo',
		'Estonian' : 'et',
		'Filipino' : 'tl',
		'Finnish' : 'fi',
		'French' : 'fr',
		'Galician' : 'gl',
		'Georgian' : 'ka',
		'German' : 'de',
		'Greek' : 'el',
		'Gujarati' : 'gu',
		'Haitian Creole' : 'ht',
		'Hebrew' : 'iw',
		'Hindi' : 'hi',
		'Hungarian' : 'hu',
		'Icelandic' : 'is',
		'Indonesian' : 'id',
		'Irish' : 'ga',
		'Italian' : 'it',
		'Japanese' : 'ja',
		'Kannada' : 'kn',
		'Korean' : 'ko',
		'Latin' : 'la',
		'Latvian' : 'lv',
		'Lithuanian' : 'lt',
		'Macedonian' : 'mk',
		'Malay' : 'ms',
		'Maltese' : 'mt',
		'Norwegian' : 'no',
		'Persian' : 'fa',
		'Polish' : 'pl',
		'Portuguese' : 'pt',
		'Romanian' : 'ro',
		'Russian' : 'ru',
		'Serbian' : 'sr',
		'Slovak' : 'sk',
		'Slovenian' : 'sl',
		'Spanish' : 'es',
		'Swahili' : 'sw',
		'Swedish' : 'sv',
		'Tamil' : 'ta',
		'Telugu' : 'te',
		'Thai' : 'th',
		'Turkish' : 'tr',
		'Ukrainian' : 'uk',
		'Urdu' : 'ur',
		'Vietnamese' : 'vi',
		'Welsh' : 'cy',
		'Yiddish' : 'yi'
	}

});
