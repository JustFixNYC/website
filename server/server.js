var stripe_dk = process.env.STRIPE_DK || 'sk_test_D32Dl92AC6IWj1MydXgEuG75';

var express = require('express'),
    compression = require('compression'),
    helmet = require('helmet'),
    bodyParser = require('body-parser'),
    donate = require('./donate');

var app = express();

app.use(compression());
app.use(helmet());

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(require('prerender-node').set('prerenderToken', '6x0ervNLErEUk7hpACc3'));

app.use('/assets', express.static(__dirname + '/assets'));
app.use('/fonts', express.static(__dirname + '/fonts'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/maps', express.static(__dirname + '/maps'));
app.use('/styles', express.static(__dirname + '/styles'));
app.use('/scripts', express.static(__dirname + '/scripts'));


app.use('/espanol', function(req, res, next) {
  res.redirect('http://beta.justfix.nyc/?lang=es_mx');
});/*
app.use('/donate', function(req, res, next) {
  res.redirect('https://www.nycharities.org/give/donate.aspx?cc=4125');
});*/
app.post('/api/donate', donate);



app.all('^(\/*?!\/api)', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('index.html', { root: __dirname });
});
var port = process.env.PORT || 8080;

app.listen(port, function() {
	console.log(port)
}); //the port you want to use
