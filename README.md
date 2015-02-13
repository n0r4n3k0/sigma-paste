∑paste
======

∑paste is an lpaste clone utilizing symmetric keys for sharing encrypted messages

Technology Stack
----------------
[Node.js](http://nodejs.org/) - For serving

[Express.js](http://expressjs.com/) - For routing

[Handlebars]() - For templating

[TripleSec](https://github.com/keybase/triplesec) - For enc/decryption

[MochaJS]() & [ChaiJS]() - For testing

How does it work?
-----------------

1. The user enters some content they wish to be encrypted and shared
2. Triple sec encrypts this information on the back end (what, sent it plaintext, oh noes)
3. A unique URL is made and all the information is sent to the database (except for the key)
4. Another user connects to the unique URL. He enters the key, decrypts, and views the message in plain
5. Another user who does not know the key connects to the URL. Whomp whomp, he sees encrypted text only.
