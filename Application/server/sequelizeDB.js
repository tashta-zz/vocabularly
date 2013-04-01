var express = require('express');
var Sequelize = require("sequelize");
var askGoogle = require('./askGoogle');

var app = express();

console.log(app.get('env'));

app.configure('development', function(){
  app.set('db host', 'ec2-107-21-107-3.compute-1.amazonaws.com');
  app.set('db user', *************);
  app.set('db pass', *************);
  app.set('db port', 5432);
  app.set('db name', *************);
})

console.log(app.get('db name'));
console.log(app.get('db user'));
console.log(app.get('db pass'));
console.log(app.get('db host'));
console.log(app.get('db port'));

var sequelize = new Sequelize(app.get('db name'), app.get('db user'), app.get('db pass'), {
	dialect: 'postgres',
	host: app.get('db host'),
	port: app.get('db port')
});

var Users = sequelize.define('Users', {
  username:  Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  nativeLanguage: Sequelize.STRING,
  foreignLanguage: Sequelize.STRING,
  userCookie: Sequelize.STRING,
  collection: Sequelize.INTEGER,
  startTrack: Sequelize.STRING,
  endTrack: Sequelize.STRING,
  best: Sequelize.INTEGER,
  rightAnswers: Sequelize.INTEGER,
  wrongAnswers: Sequelize.INTEGER
});

var Words = sequelize.define('Words', {
  word:  Sequelize.STRING,
  translation: Sequelize.STRING,
  user: Sequelize.INTEGER,
  answeredRight: Sequelize.INTEGER
});

Users.sync();
Words.sync();

exports.addUser = function(userData, callback){
	Users.find({where: {email: userData.email}}).success(function(user){
		if (user !== null){
			callback('This email already exists!');
		} else {
			Users.find({where: {username: userData.username}}).success(function(userUN){
				
				if (userUN !== null){
					callback('This username already exists!');
				} else {

					var newUser = Users.build({
						username: userData.username, 
						email: userData.email, 
						password: userData.password, 
						nativeLanguage: userData.nativeLanguage,
						foreignLanguage: userData.foreignLanguage,
						userCookie: userData.userCookie,
						collection: 0,
						startTrack: new Date().valueOf()+'',
						endTrack: new Date().valueOf()+'',
						best: 0,
						rightAnswers: 0,
						wrongAnswers: 0
					});

					newUser.save().error(function(error){
						console.log('ERROR IN ADDUSER: ' + error);
					});

					callback('Success');
				}
			});
		}
	}).error(function(error){
		console.log('ERROR IN ADDUSER: ' + error);
	});	
};


exports.addWord = function(usCookie, word, callback){

	Users.find({where: {userCookie: usCookie}}).success(function(curUser){
		askGoogle.ask(word, curUser.nativeLanguage, curUser.foreignLanguage, function(wordTrans){
			if ( word.toLowerCase() !== wordTrans.toLowerCase() ){
				Words.find({where: {user: curUser.id, word: word}}).success(function(dbWord){

					if (dbWord === null){

						curUser.collection ++;
						curUser.save();
						var newWord = Words.build({
							word: word,
							translation: wordTrans,
							user: curUser.id,
							answeredRight: 0
						});

						newWord.save();
					}

					callback({translation: wordTrans, nativeLanguage: curUser.nativeLanguage, foreignLanguage: curUser.foreignLanguage});

				});
			} else {
				callback({translation: 'not found', foreignLanguage: curUser.foreignLanguage});
			}
			
		})
		
	});
};

exports.getUserWords = function(usCookie, callback){

	Users.find({where: {userCookie: usCookie}}).success(function(curUser){
		Words.findAll({where: {user: curUser.id}, order:'word'}).success(function(words){

			if (!words.length){
				callback({userwords:"Your dictionary is empty.", username: curUser.username});
			} else {
				var result = [];
				for (var i=0; i<words.length; i++){
					result.push({ word: words[i].word, translation: words[i].translation})
				}
				callback({userwords: result, username: curUser.username});
			}

		}).error(function(error){
			console.log('WORDS ERROR (IN GET): ' + error);
		});
	});
};

exports.checkUser = function(userData, response){

	Users.find({where: {email: userData.email}}).success(function(user){
			if (user !== null){

				if (user.password === userData.password){
					response.cookie('userCookie', user.userCookie, { path:'/', expires: new Date(Date.now() + 900000000) });
	    		response.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000000), httpOnly: false });
	    		response.end('Success');
				} else {
					response.end('Wrong password.');
				}

			} else {
				response.end('Wrong email.');
			}
		}).error(function(error){
			response.end('Something is wrong...');
		})
};

exports.sendUserInfo = function(usCookie, callback){
	Users.find({where: {userCookie : usCookie}}).success(function(user){
		callback(user);
	}).error(function(error) {
		console.log('ERROR IN SENDUSERINO: ' + error);
	});
};

exports.deleteWord = function(usCookie, userWord, callback){

	Users.find({where: {userCookie: usCookie}}).success(function(curUser){
		curUser.collection--;
		curUser.save();
		Words.find({ where: {user: curUser.id, word: userWord} }).success(function(word){
			word.destroy().success(function(){
				callback()
			}).error(function(){
				console.log('DELETE ERROR (IN DELETE): '+error);
			});
		}).error(function(error){
			console.log('WORDS ERROR (IN DELETE): '+ error);
		});
	});
};

exports.updateUserStat = function(usCookie, userword, isRight, date, callback){
	var date = Number(date);
	Users.find({where: {userCookie: usCookie}}).success(function(curUser){
		if (curUser.best === 0 ){
			curUser.best = 1;
		}
		if (date - Number(curUser.endTrack) > 86400000){
			curUser.startTrack = date;
		} else {
			var track = Math.ceil((Number(curUser.endTrack) - Number(curUser.startTrack))/86400000);
			if ( track > curUser.best ){
				curUser.best = track;
			}
		}
		curUser.endTrack = date + 1 + '';
		curUser.save().success(function(){
			if (isRight === 'true'){
				curUser.rightAnswers++;
				curUser.save();
				Words.find({where: {user: curUser.id, word: userword}}).success(function(word){
					word.answeredRight++;
					word.save().success(function(){
						callback();
					});
				})
			} else {
				curUser.wrongAnswers++;
				curUser.save();
				callback();
			}
		}).error(function(error){
			console.log('ERROR IN UPDATEUSERSTATS(SAVE): ' + error);
		});
	}).error(function(error){
		console.log('ERROR IN UPDATEUSERSTATS(FIND): ' + error);
	});
};

