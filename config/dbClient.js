import Sequelize from 'sequelize';

export const sequelize = new Sequelize('bingo', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false 
});


// const mysql = require('mysql')
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'password',
//   database: 'bingo'
// })
// connection.connect()
// module.exports = connection;
