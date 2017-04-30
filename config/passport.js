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
                  var async = require('async');
                  async.parallel([
                    function(callback) {
                      db.User.create({ email: email, password: generateHash(password) }).then(function(user) {
                        done(null, user);
                        callback(null,'newUserCreated');
                      })
                    }],function(err,result) {
                      var exec = require('child_process').exec;
                      var fs = require('fs');
                      var newFolder = 'md Game\\src\\_' + req.user.id;
                      var readBasicCode = 'Game/src/BasicCode.java';
                      var writeBasicCode = 'Game/src/_' + req.user.id + '/current.txt';
                      var writePlayerClass = 'Game/src/_' + req.user.id + '/playerClass.java';
                      var readPlayer = 'Game/src/Player.java';
                      var writePlayer = 'Game/src/_' + req.user.id + '/Player.java';
                      var readPlayerCommands = 'Game/src/PlayerCommands.java';
                      var writePlayerCommands = 'Game/src/_' + req.user.id + '/PlayerCommands.java';
                      var playerCommandsCode = 'package _' + req.user.id + ';\n';
                      var playerCode = playerCommandsCode + 'import _' + req.user.id + '.PlayerCommands;\n';
                      var currentCode = playerCode + 'import _' + req.user.id + '.Player;\n';
                      exec(newFolder, function(error, stdout, stderr) {
                        if(error) {
                          console.log(error);
                        }
                        fs.readFile(readBasicCode, 'utf8', function (err,data) {
                          if (err) {
                            return console.log(err);
                          }
                          currentCode = currentCode + data;
                          fs.writeFile(writeBasicCode, currentCode, function(err) {
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
                        fs.readFile(readPlayer, 'utf8', function (err,data) {
                          if (err) {
                            return console.log(err);
                          }
                          playerCode = playerCode + data;
                          fs.writeFile(writePlayer, playerCode, function(err) {
                            if(err) {
                              return console.log(err);
                            }
                          });
                        });
                        fs.readFile(readPlayerCommands, 'utf8', function (err,data) {
                          if (err) {
                            return console.log(err);
                          }
                          playerCommandsCode = playerCommandsCode + data;
                          fs.writeFile(writePlayerCommands, playerCommandsCode, function(err) {
                            if(err) {
                              return console.log(err);
                            }
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
