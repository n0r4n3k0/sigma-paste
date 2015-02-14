var express = require('express');
var fortune = require('./lib/fortune.js');
var languages = require('./lib/languages.js');

var app = express();
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
  console.log('Title: ' + (req.body.title || ' '));
  console.log('Author: ' + (req.body.author || ' '));
  console.log('Text: ' + req.body.pastearea);
  console.log('Key: ' + req.body.key);
  res.send("Thanks");
})
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
