const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Project = sequelize.define('Project', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  title: { type: DataTypes.STRING(150), allowNull: true },
  description: { type: DataTypes.TEXT, allowNull: true },
  tech_used: { type: DataTypes.STRING(255), allowNull: true },
  project_link: { type: DataTypes.STRING(255), allowNull: true },
}, {
  tableName: 'projects',
  timestamps: false,
});

module.exports = Project;
