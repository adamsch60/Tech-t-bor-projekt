// app/routes.js
module.exports = function(app, passport) {



var LocalStrategy = require('passport-local').Strategy;

// load up the user model
// var User = require('../app/models/user');
	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function(req, res) {
		res.render('Home.ejs'); // load the index.ejs file
	});

	app.get('/News', function(req, res) {
		res.render('News.ejs'); // load the index.ejs file
	});
	app.get('/About', function(req, res) {
		res.render('About.ejs'); // load the index.ejs file
	});

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form

	// process the login form

	app.post('/code', function(req, res) {
		// User.findOne({'local.email': req.user.local.email},function(err,user){
		// 	user.local.code=req.body.code;
		//
		// });
		console.log(req.body.code);
		var fs = require('fs');
		var file = "database/" + req.user.id + ".txt";
		console.log(file);
		fs.writeFile(file, req.body.code, function(err) {
		    if(err) {
		        return console.log(err);
		    }
		    console.log("The file was saved!");
		}); 
		var exec = require('child_process').exec;
        var cmd = 'java Program';
        exec(cmd, function(error, stdout, stderr) {
            if(error) {
            	return console.log(error);
            }
            console.log(stdout);
        });
		res.send('success');
	});


	app.post('/sign', function(req, res) {
		console.log('log request');
		var inputValue = req.body.submit;

		if (inputValue == "login") {
			console.log('login request');
			return passport.authenticate('local-login', {
				successRedirect: '/Main', // redirect to the secure profile section
				failureRedirect: '/', // redirect back to the signup page if there is an error
				failureFlash: true // allow flash messages
			})(req, res);
		} else if (inputValue == "register") {
			return passport.authenticate('local-signup', {
				successRedirect: '/Main', // redirect to the secure profile section
				failureRedirect: '/', // redirect back to the signup page if there is an error
				failureFlash: true // allow flash messages
			})(req, res);
		}

	});

	// =====================================
	// SIGNUP ==============================
	// =====================================


	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/Main', isLoggedIn, function(req, res) {
		console.log('Main part here!');
		res.render('Main.ejs', {
			user: req.user // get the user out of session and pass to template
		});
	});

	app.get('/Shop', isLoggedIn, function(req, res) {
		res.render('Shop.ejs', {
			user: req.user // get the user out of session and pass to template
		});
	});

	app.get('/Ladder', isLoggedIn, function(req, res) {
		res.render('Ladder.ejs', {
			user: req.user // get the user out of session and pass to template
		});
	});

	app.get('/Doc', isLoggedIn, function(req, res) {
		res.render('Doc.ejs', {
			user: req.user // get the user out of session and pass to template
		});
	});

	app.get('/Play', isLoggedIn, function(req, res) {
		//var fs = require('fs');
		var file = "C:/Users/Patrick/Desktop/Programming/Tech tábor/Tech-t-bor-projekt/Game/match.txt";
		res.sendfile(file);
		/*var matchdata;
		fs.readFile(file, 'utf8', function(err, data) {
		  if (err) throw err;
		  console.log(data);
		  matchdata = JSON.stringify(data);
		});*/
	  	res.render('Play.ejs', {
			user: req.user // get the user out of session and pass to template
			//data: matchdata
		});
	});
	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
