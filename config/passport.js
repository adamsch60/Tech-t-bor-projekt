// config/passport.js

// load all the things we need
var LocalStrategy = require('passport-local').Strategy;
var bcrypt   = require('bcrypt-nodejs');

// load up the user model
var db = require('./database');

function generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

function validPassword(password, user) {
    return bcrypt.compareSync(password, user.password);
};

// expose this function to our app using module.exports
module.exports = function(passport) {

  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    console.log("user.id")
    console.log(user.id)

    // console.log(done)
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    db.User.find({where: {id: id}}).then(function(user) {
      done(null, user);
    }).error(function(err) {
      done(err, null);
    });
  });


  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use('local-signup', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {

      db.User.find({ where: { email: email }}).then(function(user) {
        if (user) {
          done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        } else {
          db.User.create({ email: email, password: generateHash(password) }).then(function(user) {
            done(null, user);
          })
        }
      }).error(function(err){
        done(err);
      });

    }));

  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use('local-login', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

      db.User.find({ where: { email: email }}).then(function(user) {
        if (!user) {
          return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
        } else if (!validPassword(password, user)) {
          return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
        } else {
          console.log(user);
          return done(null, user);
        }
      }).error(function(err){
        return done(err);
      });

    }));

};
