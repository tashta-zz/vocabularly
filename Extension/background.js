chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
	if (request.message === 'speak'){
    chrome.tts.speak(request.data.word, {'lang': request.data.language});
	}
});