const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Skill = sequelize.define('Skill', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  skill_name: { type: DataTypes.STRING(100), unique: true, allowNull: false },
  is_custom: { type: DataTypes.BOOLEAN, defaultValue: false },
}, {
  tableName: 'skills_master',
  timestamps: false,
});

module.exports = Skill;
