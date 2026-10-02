const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Achievement = sequelize.define('Achievement', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  title: { type: DataTypes.STRING(150), allowNull: true },
  issuer: { type: DataTypes.STRING(150), allowNull: true },
  date: { type: DataTypes.STRING(50), allowNull: true },
  description: { type: DataTypes.TEXT, allowNull: true },
}, {
  tableName: 'achievements',
  timestamps: false,
});

module.exports = Achievement;
