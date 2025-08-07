import { DataTypes } from 'sequelize';
import { sequelize } from "../config/dbClient.js"

export const User = sequelize.define('User', {

  username: {type: DataTypes.STRING, allowNull: false, unique: true},

  email: {type: DataTypes.STRING, allowNull: false, unique: true},

  password_hash: {type: DataTypes.STRING, allowNull: false},

  avatar_url: {type: DataTypes.STRING, allowNull: true},

  status: {type: DataTypes.ENUM('online', 'offline', 'away'), defaultValue: 'offline'},

  last_seen: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},

  createdAt: {type: DataTypes.DATE, field: 'created_at'},

  updatedAt: {type: DataTypes.DATE, field: 'updated_at'}

}, {
    tableName: 'users'
});

