var https = require('https');

exports.ask = function(curWord, natLang, forLang, callback){

  var options = {
	  hostname: 'www.googleapis.com',
	  path: '/language/translate/v2?key=YOUR_API_KEY&source=' + forLang + '&target=' + natLang + '&q=' + curWord,
	  method: 'GET'
	};

	var req = https.request(options, function(res) {
	  res.setEncoding('utf8');
	  res.on('data', function (chunk) {
	    var wordTrans = JSON.parse(chunk).data.translations[0].translatedText;
	      callback(wordTrans);
	      req.end();
	  });
	});

	req.on('error', function(e) {
	  console.log('problem with request: ' + e.message);
	});

	req.end();

};
