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
		var exec = require('child_process').exec;
		console.log(req.body.code);
		var fs = require('fs');
		var currentCode = 'Game/src/_' + req.user.id + '/game/current.txt';
		var playerClass = 'Game/src/_' + req.user.id + '/game/playerClass.java';
		var temp = 'Game/src/_' + req.user.id + '/game/temp.txt';
		var copyJavaToText = 'copy /y Game\\src\\_' + req.user.id + '\\game\\playerClass.java Game\\src\\_' + req.user.id + '\\game\\temp.txt';
		var copyTextToJava = 'copy /y Game\\src\\_' + req.user.id + '\\game\\temp.txt Game\\src\\_' + req.user.id + '\\game\\playerClass.java';
		fs.writeFile(currentCode, req.body.code, function(err) {
		    if(err) {
		        return console.log(err);
		    }
		});   
		exec(copyJavaToText,function(err,stdouter,stderr) {
			if(err) {
				console.log(err);
			}
			console.log('one');
			fs.writeFile(playerClass, req.body.code, function(err) {
			    if(err) {
			        return console.log(err);
			    }
			    console.log('two');
	 			var cmd = 'javac -cp _' + req.user.id + ' src\\_' + req.user.id + '\\game\\*.java src\\src\\game\\*.java';
	 			exec(cmd,{cwd:'Game/'},function(err,stdouterr,stderrr) {
		 			if(err) {
		 				console.log('err');
		 				exec(copyTextToJava,function(err,stdouter,stderr) {
							if(err) {
								return console.log(err);
							}
						});
						var message=[0/*sikeres-e*/,err+' '+stdouterr+' '+stderrr/*hibe/siker üzenet*/];
						res.send(message);
		 				return console.log(err);
		 			}
		 			console.log('done');
		 			var message=[1/*sikeres-e*/,"Correct!"/*hibe/siker üzenet*/];
					res.send(message);
	 			});
	        });
		});
	}); 

	app.post('/match', function(req, res) {
		var exec = require('child_process').exec;
 		var compile = 'javac -d classes -cp classes src\\_1\\game\\*.java src\\_2\\game\\*.java src\\src\\game\\*.java';
 		var run = 'java -cp classes src.game.Game _1 _2';
 		exec(compile,{cwd:'Game/'},function(err,stdouter,stderr) {
 			if(err) {
 				return console.log(err);
 			}
 			exec(run,{cwd:'Game/'},function(err,stdout,stderr) {
 				if(err) {
 					return console.log(err);
 				}
 				console.log(stdout);		
 				res.send(stdout);
 //				res.send(JSON.parse(stdout));
 
 			});
 		});
	});



	app.post('/get_code', function(req, res) {
		var fs =  require('fs');
		var file = 'Game/src/_' + req.user.id + '/game/current.txt';
		fs.readFile(file, 'utf8', function (err,data) {
		 	if (err) {
				return console.log(err);
			}
			console.log("data= "+data);
			res.send(data);
		});
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
	  	res.render('Play.ejs', {
			user: req.user // get the user out of session and pass to template
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
