var addUser = function(userData){
	$.ajax({
    url: '/user',
    type: 'POST',
    data: userData,
    success: function(response){
    	if (response === 'Success'){
    		window.location = '/dictionary';
    	} else {
    		$('.regError').text(response);
    	}
    }
  });
};

var checkPassword = function(userData){
	$.ajax({
    url: '/login',
    type: 'POST',
    data: userData,
    success: function(response){
      if (response === 'Success') {
        window.location = '/dictionary';
      }  else {
        $('.regError').text(response);
      }
    }
  });
};

var getWords = function(callback){
    $.ajax({
        url: '/words',
        type: 'GET',
        success: function(data){
          var data = JSON.parse(data);
          callback(data);
        }
    });
};

var deleteWord = function(userword, callback){
  $.ajax({
    url: '/deleteword',
    type: 'POST',
    data: {delword: userword},
    success: function(){
      callback();
    }
  });
};

var updateStatistics = function(userword, right, curDate, callback){
  $.ajax({
    url: '/wordstatistics',
    type: 'POST',
    data: {userword: userword, isRight: right, date: curDate},
    success: function(response){
      callback(response);
    }
  });
};

var getUserData = function(callback){
  $.ajax({
      url: '/userinfo',
      type: 'GET',
      success: function(data){
        callback(data);
      }
    });
};
