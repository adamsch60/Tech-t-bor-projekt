// server.js

// set up ======================================================================
// get all the tools we need


var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
//var flash        = require('req-flash');

var session = require('express-session');
var cookieParser = require('cookie-parser');


var configDB = require('./config/database.js');

require('./config/passport')(passport); // pass passport for configuration

app.configure(function() {

	// set up our express application
	app.use(express.logger('dev')); // log every request to the console
	app.use(express.cookieParser()); // read cookies (needed for auth)
	app.use(express.bodyParser()); // get information from html forms

	app.set('view engine', 'ejs'); // set up ejs for templating

	// required for passport
	app.use(express.session({
		secret: 'ilovescotchscotchyscotchscotch' ,resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
	})); // session secret
	app.use(flash()); // use connect-flash for flash messages stored in session

	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions

});

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// public folder ===============================================================
app.use(express.static('public'));

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
