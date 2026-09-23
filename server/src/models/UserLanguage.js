const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const UserLanguage = sequelize.define('UserLanguage', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  language_id: { type: DataTypes.INTEGER, allowNull: false },
  proficiency: {
    type: DataTypes.ENUM('Basic', 'Intermediate', 'Advanced'),
    defaultValue: 'Basic',
  },
}, {
  tableName: 'user_languages',
  timestamps: false,
});

module.exports = UserLanguage;
