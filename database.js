const Sequelize = require('sequelize');
const connection =  new Sequelize("one_player", "william1344", "cavalocriolo01@", {
  host: "oneplayermysql.mysql.database.azure.com",
  dialect: 'mysql',
  define: {freezeTableName: true},
});

module.exports = connection;