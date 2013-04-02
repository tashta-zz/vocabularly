vocabularly
===========

http://vocabularly.herokuapp.com

Translation application that can help you to enlarge your vocabulary.
It consist of three main parts:
- Google Chrome extension;
- Server side (Node.js, Express, Postgres, Sequelize);
- Client side (Backbone.js).
I also used Google Translate API and Google TTS.

Issues:
- Now tts works only for English.

TODO:
- Solve the problem with tts: find a way to convert text to speech or remove speaker signs for other languages.
- Refactor the client side code to use Backbone for communications with server.