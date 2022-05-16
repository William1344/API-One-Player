const Sequelize = require('sequelize');
const connection =  new Sequelize('tester', 'root', 'cavalo', {
  host: 'localhost',
  dialect: 'mysql',
  define: {freezeTableName: true},
});

module.exports = connection;