const { Sequelize } = require('sequelize');

const connection = new Sequelize('bingo', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false 
});

module.exports = connection;

// const mysql = require('mysql')
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'password',
//   database: 'bingo'
// })
// connection.connect()
// module.exports = connection;
