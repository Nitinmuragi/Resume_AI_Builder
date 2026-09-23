const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const JobDescription = sequelize.define('JobDescription', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  jd_title: { type: DataTypes.STRING(150), allowNull: true },
  jd_text: { type: DataTypes.TEXT, allowNull: false },
}, {
  tableName: 'job_descriptions',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

module.exports = JobDescription;
