var express = require('express');
var fortune = require('./lib/fortune.js');
var languages = require('./lib/languages.js');
var triplesec = require('triplesec');
var credentials = require('./credentials.js');
var Encryptor = triplesec.Encryptor;
var Decryptor = triplesec.Decryptor;

var app = express();

var mongoose = require('mongoose');
var opts = {
  server: {
    socketOptions: { keepAlive: 1 }
  }
};
switch(app.get('env')){
  case 'development':
    mongoose.connect(credentials.mongo.development.connectionString, opts);
    break;
  case 'production':
    mongoose.connect(credentials.mongo.production.connectionString, opts);
    break;
  default:
    throw new Error('Unknown execution environment: ' + app.get('env'));
}

var Paste = require('./models/paste.js');

var handlebars = require('express-handlebars')
  .create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.disable('x-powered-by');

app.set('port', process.env.PORT || 3001);

app.use(express.static(__dirname + '/public'));

app.use(require('body-parser')());

app.use(function(req, res, next){
  res.locals.showTests = app.get('env') !== 'production' &&
    req.query.test === '1';
  next();
});

app.get('/', function(req, res){
  res.render('home', {
    languages: languages,
    pageTestScript: '/qa/tests-home.js'
  });
});

app.get('/about', function(req, res){
  res.render('about', {
    fortune: fortune.getFortune(),
    pageTestScript: '/qa/tests-about.js'
  });
});

app.get('/headers', function(req, res){
  res.set('Content-Type', 'text/plain');
  var s = '';
  for(var name in req.headers) s += name + ': ' + req.headers[name] + '\n';
  res.send(s);
});

app.post('/submit', function(req, res){
  var key = new Buffer(req.body.key);
  var cleartext = new Buffer(req.body.pastearea);
  var paste = '';
  var enc = new Encryptor({key: key});
  enc.run({data: cleartext}, function(err, ciphertext){
    paste = ciphertext;
    new Paste({
      author: req.body.author,
      title: req.body.title,
      paste: paste,
      language: req.body.language
    }).save(function(err, pasteobj, numberAffected){
      res.redirect('/' + pasteobj._id);
    });
  });
});

app.post('/decode', function(req, res){
  var key = new Buffer(req.body.key);
  Paste.find({ _id: req.body.paste }, function(err, paste){
    var result = paste[0];
    var cleartext = '';
    var dec = new Decryptor({key: key});
    console.log(result.paste.toString('hex'));
    dec.run({data: result.paste}, function(err, plaintext){
      if(err){
        console.log(err);
        res.status(404);
        res.render('404');
      } else {
        cleartext = plaintext.toString();
        res.send(cleartext);
      }
    });
  });
});

app.get('/:id', function(req, res){
  Paste.find({ _id: req.params.id }, function(err, paste){
    var result = paste[0];
    res.render('paste', {
      paste: {
        id: result._id,
        author: result.author,
        title: result.title,
        pastetext: result.paste
      }
    });
  });
});

// custom 404 page
app.use(function(req, res){
  res.status(404);
  res.render('404');
});

// custom 500 page
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.'
  );
});
