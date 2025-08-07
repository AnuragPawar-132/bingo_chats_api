import  { DataTypes } from 'sequelize';
import  { sequelize } from "../config/dbClient.js"

export const Message = sequelize.define('Message', {

  sender_id: {type: DataTypes.STRING, allowNull: false},

  receiver_id: {type: DataTypes.STRING, allowNull: false},

  content: {type: DataTypes.STRING, allowNull: false},

  timestamp: {type: DataTypes.DATE, field: 'timestamp'}

}, {
    tableName: 'messages',
    timestamps: false
});

