const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Experience = sequelize.define('Experience', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  company_name: { type: DataTypes.STRING(150), allowNull: true },
  designation: { type: DataTypes.STRING(150), allowNull: true },
  start_date: { type: DataTypes.DATEONLY, allowNull: true },
  end_date: { type: DataTypes.DATEONLY, allowNull: true },
  is_current: { type: DataTypes.BOOLEAN, defaultValue: false },
  description: { type: DataTypes.TEXT, allowNull: true },
}, {
  tableName: 'experience',
  timestamps: false,
});

module.exports = Experience;
