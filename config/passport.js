// config/passport.js

// load all the things we need
var LocalStrategy = require('passport-local').Strategy;
var bcrypt   = require('bcrypt-nodejs');
//var flash        = require('req-flash');
var flash        = require('connect-flash');

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
      // by default, local strategy uses username and password, we will override with username
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) {
            db.User.find({ where: { username: username }}).then(function(user) {
              if (user) {
                done(null, false, req.flash('loginMessage', 'That username is already taken.'));
              } else {
                  var async = require('async');
                  async.parallel([
                    function(callback) {
                      db.User.create({ username: username, password: generateHash(password) }).then(function(user) {
                        done(null, user);
                        callback(null,'newUserCreated');
                      })
                    }],function(err,result) {
                      var exec = require('child_process').exec;
                      var fs = require('fs');
                      var newFolder = 'mkdir Game/src/_' + req.user.id;
                      var newGameFolder = newFolder + '/game';
                      var readPlayerClass = 'Game/src/playerClass.java';
                      var writeCurrent = 'Game/src/_' + req.user.id + '/game/current.txt';
                      var writePlayerClass = 'Game/src/_' + req.user.id + '/game/playerClass.java';
                      var currentCode = 'package _' + req.user.id + '.game;\n import src.game.PlayerCommands;\n import src.game.Player;\n';
                      exec(newFolder, function(error, stdout, stderr) {
                        if(error) {
                          console.log(error);
                        }
                        exec(newGameFolder, function(error, stdout, stderr) {
                        if(error) {
                          console.log(error);
                        }
                          fs.readFile(readPlayerClass, 'utf8', function (err,data) {
                            if (err) {
                              return console.log(err);
                            }
                            currentCode = currentCode + data;
                            fs.writeFile(writeCurrent, currentCode, function(err) {
                              if(err) {
                                return console.log(err);
                              }
                            });
                            fs.writeFile(writePlayerClass, currentCode, function(err) {
                              if(err) {
                                return console.log(err);
                              }
                            });
                          });
                        });
                      });
                    });
              }
            }).error(function(err){
              done(err);
            });
    }
  ));

  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use('local-login', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with username
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) { // callback with username and password from our form

      db.User.find({ where: { username: username }}).then(function(user) {
        if (!user) {
          return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
        } else if (!validPassword(password, user)) {
          return done(null, false, [req.flash('loginMessage', 'Oops! Wrong password.'),console.log("Maaaan") ]); // create the loginMessage and save it to session as flashdata
        } else {
          console.log(user);
          return done(null, user);
        }
      }).error(function(err){
        return done(err);
      });

    }));

};
