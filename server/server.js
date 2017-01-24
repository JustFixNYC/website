var express = require('express'),
    compression = require('compression'),
    helmet = require('helmet');

var app = express();

app.use(compression());
app.use(helmet());

app.use(require('prerender-node').set('prerenderToken', '6x0ervNLErEUk7hpACc3'));

app.use('/assets', express.static(__dirname + '/assets'));
app.use('/fonts', express.static(__dirname + '/fonts'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/maps', express.static(__dirname + '/maps'));
app.use('/styles', express.static(__dirname + '/styles'));
app.use('/scripts', express.static(__dirname + '/scripts'));


app.use('/espanol', function(req, res, next) {
  res.redirect('http://beta.justfix.nyc/?lang=es_mx');
});
app.use('/signup', function(req, res, next) {
  res.redirect('http://beta.justfix.nyc/signup');
});
app.use('/donate', function(req, res, next) {
  res.redirect('https://www.nycharities.org/give/donate.aspx?cc=4125');
});



app.all('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('index.html', { root: __dirname });
});

var port = process.env.PORT || 8080;

app.listen(port); //the port you want to use
