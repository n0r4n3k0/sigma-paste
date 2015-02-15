∑paste
======

∑paste is an lpaste clone utilizing symmetric keys for sharing encrypted messages

Technology Stack
----------------
[Node.js](http://nodejs.org/) - For serving

[Express.js](http://expressjs.com/) - For routing

[HandlebarsJS](http://handlebarsjs.com/) - For templating

[TripleSec](https://github.com/keybase/triplesec) - For enc/decryption

[MochaJS](http://mochajs.org/) & [ChaiJS](http://chaijs.com/) - For testing

Also used: Grunt, Mongoose, Twitter Bootstrap, and the body-parser middleware.

Finally, I also stole some ideas from 'Web Development with Node and Express',
which I was using to strengthen my node.js knowledge as I built this application.

How does it work?
-----------------

1. The user enters some content they wish to be encrypted and shared
2. Triple sec encrypts this information on the back end (what, sent it plaintext, oh noes)
3. A unique URL is made and all the information is sent to the database (except for the key and the plaintext)
4. Another user connects to the unique URL given to the encryptor. He enters the key, the server decrypts, sends, and he views the message in plain
5. Another user who does not know the key connects to the URL. Whomp whomp, he sees a 404.

The language piece hasn't been implemented yet, but the intent is to offer code highlighting on the
decrypted message.

Notes
-----
This relies on https encryption (not yet implemented) to keep the plaintext from view as it is sent from
the server to the client. Please also note that this uses symmetric cryptography,
that is, the key used to decrypt the message is the same as the one used to encrypt
the message, meaning that the sender and receiver must share the key but keep it
secure on both ends. This means one must share the key over a secure channel, and
trust that the other person hasn't distributed the key to anyone who should not
see the message.
