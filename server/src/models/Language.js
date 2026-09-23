const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Language = sequelize.define('Language', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  language_name: { type: DataTypes.STRING(50), unique: true, allowNull: false },
}, {
  tableName: 'languages_master',
  timestamps: false,
});

module.exports = Language;
