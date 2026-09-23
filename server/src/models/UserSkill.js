const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const UserSkill = sequelize.define('UserSkill', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  skill_id: { type: DataTypes.INTEGER, allowNull: false },
  proficiency: {
    type: DataTypes.ENUM('Basic', 'Intermediate', 'Advanced'),
    defaultValue: 'Basic',
  },
}, {
  tableName: 'user_skills',
  timestamps: false,
});

module.exports = UserSkill;
