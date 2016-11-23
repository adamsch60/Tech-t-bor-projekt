// app/routes.js
module.exports = function(app, passport) {

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
	app.post('/',function(req, res) { 
	var inputValue = req.body.submit;
		
		if(inputValue="login"){
		passport.authenticate('local-login', {
		var inputValue = req.body.submit;
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
		}) } else if (inputValue="register") { 
		passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
		}) }
	
	}));

	// =====================================
	// SIGNUP ==============================
	// =====================================


	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/Main', isLoggedIn, function(req, res) {
		res.render('Main.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

	app.get('/Shop', isLoggedIn, function(req, res) {
		res.render('Shop.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

	app.get('/Ladder', isLoggedIn, function(req, res) {
		res.render('Ladder.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});
	
	app.get('/Doc', isLoggedIn, function(req, res) {
		res.render('Doc.ejs', {
			user : req.user // get the user out of session and pass to template
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
