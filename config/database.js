var Sequelize = require('sequelize');

var sequelize = new Sequelize("roboclash", "server", "pXeQf6EnDdKR", {
  dialect: 'sqlite',
  storage: "./sqlitedb/database.sqlite"
});

// define the schema for our user model
var User = sequelize.define('User',
{
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  elo: { type: Sequelize.DOUBLE, defaultValue: 1000},
  avaible: { type: Sequelize.BOOLEAN, defaultValue: false},
  playedAgainst: {type: Sequelize.ARRAY} //Az id-je azoknak akkikkel már játszott az adott formában;
})

User.sync();

module.exports = { User : User };
