var express = require('express'),
    https = require('https'),
    fs = require('fs'),
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
  res.redirect('https://beta.justfix.nyc/espanol');
});
app.use('/signup', function(req, res, next) {
  if(req.query.q && req.query.lang) {
    res.redirect('https://beta.justfix.nyc/onboarding/referral?q=' + req.query.q + '&lang=' + req.query.lang);
  } else if(req.query.q) {
    res.redirect('https://beta.justfix.nyc/onboarding/referral?q=' + req.query.q);
  } else if(req.query.lang) {
    res.redirect('https://beta.justfix.nyc/onboarding/referral?lang=' + req.query.lang);
  } else {
    res.redirect('https://beta.justfix.nyc/signup');
  }
});
app.use('/advocate-signup', function(req, res, next) {
  res.redirect('https://beta.justfix.nyc/advocate/signup');
});
app.use('/update', function(req, res, next) {
  res.redirect('https://beta.justfix.nyc/?status=1');
});
app.use('/survey', function(req, res, next) {
  res.redirect('https://goo.gl/forms/VWpzNLJq4eWcYyUn1');
});
app.post('/api/donate', donate);

// use this for ssl renewal
app.use('/.well-known/acme-challenge/' + process.env.CERTBOT_URL, function(req, res) {
  res.send(process.env.CERTBOT_KEY);
});
// app.all('/*', function(req, res, next) {
//     // Just send the index.html for other files to support HTML5Mode
//     res.sendFile('index.html', { root: __dirname });
// });

// disable this for ssl renewal (verifies via http)
app.all(/^\/(?!api).*/, function(req, res, next) {
  if(req.headers['x-forwarded-proto'] != 'https' && process.env.NODE_ENV === 'production') {
    res.redirect('https://' + req.hostname + req.url);
  } else {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('index.html', { root: __dirname });
  }
});


var port = process.env.PORT || 8080;


// var privateKey = fs.readFileSync(__dirname + '/ssl/privkey.pem').toString();
// var certificate = fs.readFileSync(__dirname + '/ssl/cert.pem').toString();
//
// var options = {
//   key: privateKey,
//   cert: certificate
// };

// https.createServer(options, app).listen(port, function () {
//   console.log("Express server listening on port " + app.get('port'));
// });

app.listen(port); //the port you want to use
