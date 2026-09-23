const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  full_name: { type: DataTypes.STRING(150), allowNull: false },
  email: { type: DataTypes.STRING(150), unique: true, allowNull: true },
  mobile_no: { type: DataTypes.STRING(15), unique: true, allowNull: true },
  password_hash: { type: DataTypes.STRING(255), allowNull: false },
  is_email_verified: { type: DataTypes.BOOLEAN, defaultValue: false },
  is_mobile_verified: { type: DataTypes.BOOLEAN, defaultValue: false },
  reset_token: { type: DataTypes.STRING(255), allowNull: true },
  reset_token_expiry: { type: DataTypes.DATE, allowNull: true },
}, {
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = User;
