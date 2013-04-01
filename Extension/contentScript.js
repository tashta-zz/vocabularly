// var basicUrl = 'http://localhost:5000';
var basicUrl = 'http://vocabularly.herokuapp.com';
var speakLang;

var getUserInfo = function(callback){
	$.ajax({
    url: basicUrl + '/userinfo',
    type: 'GET',
    success: function(data){
    	callback(data);
    }
  });
};

var saveWord = function(userWord, callback){
	$.ajax({
	    url: basicUrl + '/dictionary',
	    type: 'POST',
	    data: {word: userWord},
	    success: function(response){
	    	callback(JSON.parse(response));
	    }
	  });
};

var popUp = function(apiTranslation, natLang, forLang){

	var popup = document.createElement('div');
	popup.className = 'vocabExtPopup';
	popup.id = 'test';

	var cancel = document.createElement('p');
	cancel.className = 'vocabExtCancel';
	cancel.innerHTML = 'x';
	cancel.onclick = function (e) { popup.parentNode.removeChild(popup) };

	if ( forLang !== 'de' ){
		selectedWord = selectedWord.toLowerCase();
	}

	var word = document.createElement('p');
	word.innerHTML = selectedWord;
	word.className = 'vocabExtWord';

	if ( apiTranslation !== 'not found'){
		var speak = document.createElement('span');
		speak.innerHTML = '&#128265;';
		speak.className = 'vocabExtSpeak';
		speak.onclick = function(e){
			e.stopPropagation();
			chrome.extension.sendRequest({ 'message':'speak', 'data': {'word':selectedWord, 'language': forLang} }, function(response){});
		};
		word.appendChild(speak);
	}

	if ( natLang !== 'de' ){
		apiTranslation = apiTranslation.toLowerCase();
	}

	var translation = document.createElement('p');
	translation.innerHTML = apiTranslation;
	translation.className = 'vocabExtTrans';

	popup.appendChild(cancel);
	popup.appendChild(word);                                    
	popup.appendChild(translation);

	$(popup).css( 'position', 'absolute' );
	$(popup).css( 'left', (xCoord - 150) +'px' );
	$(popup).css( 'top', (yCoord - 100) + 'px' );

	document.body.appendChild(popup);
	
};

document.addEventListener('mouseup', function(event){


	if (window.location.origin !== basicUrl){

		var sel = window.getSelection().toString();
		xCoord = event.screenX;
		yCoord = event.pageY;

		if (sel){
			$('.vocabExtPopup').remove();
		}
	   
	  if(/^[^\s\d\^\#\$%&\*\(\)@!_\+=,\.<>:;'"\\|\{\[\]\}~`\/]+$/.test(sel)) {
    	selectedWord = sel;
	  	saveWord(selectedWord, function(res){
	  		if (res === 'Register.'){
	  			window.open(basicUrl, 'popUpWindow','height=520,width=1300,left=50,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes');
	  		} else {
	  			popUp(res.translation, res.nativeLanguage, res.foreignLanguage);
	  		}
	  	});
		}

  } else {

  	var sel = window.getSelection();
  	if (sel.focusNode && sel.focusNode.nodeValue === '🔉'){

  		var speakWord = sel.baseNode.parentElement.previousSibling.data;
  		if ( !speakLang ){
  			getUserInfo(function(data){
	  			speakLang = data.foreignLanguage;
	  			chrome.extension.sendRequest({ 'message':'speak', 'data': {'word':speakWord, 'language': speakLang} }, function(response){});
	  		});
  		} else {
  			chrome.extension.sendRequest({ 'message':'speak', 'data': {'word':speakWord, 'language': speakLang} }, function(response){});
v  		}

  	} 
  } 
});

