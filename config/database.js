var Sequelize = require('sequelize');

var sequelize = new Sequelize("roboclash", "server", "pXeQf6EnDdKR", {
  dialect: 'sqlite',
  storage: "./sqlitedb/database.sqlite"
});

// define the schema for our user model
var User = sequelize.define('User',
{
  username: Sequelize.STRING,
  password: Sequelize.STRING
})

User.sync();

module.exports = { User : User };
