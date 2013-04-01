var express = require('express');
var path = require('path')
var sequelizeDB = require('./sequelizeDB');
var hash = require('./pass').hash;

var app = express();
app.use(express.bodyParser());
app.use(express.cookieParser());

app.get('/', function(request, response) {
  if (request.cookies.userCookie){
    response.redirect('/dictionary');
  } else {
    response.sendfile(path.resolve(__dirname + '/../client/html/main.html'));
  }
});

app.get('/dictionary', function(request, response) {
  if (!request.cookies.userCookie){
    response.redirect('/');
  } else {
    response.sendfile(path.resolve(__dirname + '/../client/html/dictionary.html'));
  }
});

app.get('/practice', function(request, response) {
  if (!request.cookies.userCookie){
    response.redirect('/');
  } else {
    response.sendfile(path.resolve(__dirname + '/../client/html/practice.html'));
  }
});

app.get('/profile', function(request, response) {
  if (!request.cookies.userCookie){
    response.redirect('/');
  } else {
    response.sendfile(path.resolve(__dirname + '/../client/html/profile.html'));
  }
});

app.get('/logout', function(request, response){
  response.clearCookie('userCookie', {path: '/'});
  response.redirect('/');
});

app.get('/words', function(request, response){
  var userCookie = request.cookies.userCookie;
  if (userCookie){
    sequelizeDB.getUserWords(userCookie, function(info){
      response.end(JSON.stringify(info));
    })
  } else {
    response.redirect('/');
  }
  
});

app.get('/userinfo', function(request, response) {
  var userCookie = request.cookies.userCookie;
  if (!userCookie){
    response.end('Register.');
  } else {
    sequelizeDB.sendUserInfo(userCookie, function(info){
      response.end( JSON.stringify(info) );
    });
  }
});

app.post('/login', function(request, response){
  sequelizeDB.checkUser(request.body, response);
});

app.post('/user', function(request, response) {
  var userData = request.body;
  hash(userData.username + "|" + userData.password, "secret", function(err, hash){
    hash = new Buffer(hash).toString("base64").substring(0, 64);
    response.cookie('userCookie', hash, { path:'/', expires: new Date(Date.now() + 90000000) });
    response.cookie('rememberme', '1', { expires: new Date(Date.now() + 90000000), httpOnly: false });
    userData.userCookie = hash;
    sequelizeDB.addUser(userData, function(message){
      response.end(message);
    })
  });  
});

app.post('/dictionary', function(request, response){
  var userCookie = request.cookies.userCookie;
  if (!userCookie){
    response.end(JSON.stringify('Register.'));
  } else {
    sequelizeDB.addWord(userCookie, request.body.word, function(data){
      response.end(JSON.stringify(data));
    });
  }
});

app.post('/deleteword', function(request, response){
  var userCookie = request.cookies.userCookie;
  if (!userCookie){
    response.redirect('/');
  } else {
    sequelizeDB.deleteWord(userCookie, request.body.delword, function(){
      response.end('Word was deleted');
    });
  }
});

app.post('/wordstatistics', function(request, response){
  var userCookie = request.cookies.userCookie;
  if (!userCookie){
    response.redirect('/');
  } else {
    sequelizeDB.updateUserStat(userCookie, request.body.userword, request.body.isRight, request.body.date, function(){
      response.end('Stat updated!');
    });
  }
})

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

app.use(express.static(__dirname + '/../client/html'));
app.use(express.static(__dirname + '/../client/js'));
app.use(express.static(__dirname + '/../client/css'));
app.use(express.static(__dirname + '/../client/png'));
app.use(express.static(__dirname + '/../client/ttf'));
app.use(express.static(__dirname + '/../client/ico'));
app.use(express.static(__dirname + '/../lib'));