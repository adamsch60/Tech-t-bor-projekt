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
  avaible: { type: Sequelize.BOOLEAN, defaultValue: false}
  //playedAgainst:  Sequelize.ARRAY //Az id-je azoknak akkikkel már játszott az adott formában, de ez sajnos itt nincs az sqlite-bam, így vhogy máshogy kéne megoldani => CSIRKEEEE!
})




// define the schema for our user model
var Match = sequelize.define('Match',
{
  date: Sequelize.DATE,
  history: Sequelize.STRING,
  //playedAgainst:  Sequelize.ARRAY //Az id-je azoknak akkikkel már játszott az adott formában, de ez sajnos itt nincs az sqlite-bam, így vhogy máshogy kéne megoldani => CSIRKEEEE!
})

Match.belongsTo(User, {foreignKey: 'p1Id'});
Match.belongsTo(User, {foreignKey: 'p2Id'}); 
User.sync();
Match.sync();


module.exports = { User : User , Match : Match, Sequelize: sequelize};
