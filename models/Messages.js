const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbClient');

const Message = sequelize.define('Message', {

  sender_id: {type: DataTypes.STRING, allowNull: false},

  receiver_id: {type: DataTypes.STRING, allowNull: false},

  content: {type: DataTypes.STRING, allowNull: false},

  timestamp: {type: DataTypes.DATE, field: 'timestamp'}

}, {
    tableName: 'messages',
    timestamps: false
});

module.exports = Message;
