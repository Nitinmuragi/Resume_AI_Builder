const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Education = sequelize.define('Education', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  degree: { type: DataTypes.STRING(150), allowNull: true },
  institution: { type: DataTypes.STRING(150), allowNull: true },
  start_year: { type: DataTypes.INTEGER, allowNull: true },
  end_year: { type: DataTypes.INTEGER, allowNull: true },
  grade: { type: DataTypes.STRING(50), allowNull: true },
}, {
  tableName: 'education',
  timestamps: false,
});

module.exports = Education;
