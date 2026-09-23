const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Resume = sequelize.define('Resume', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  template_id: { type: DataTypes.INTEGER, allowNull: false },
  parent_resume_id: { type: DataTypes.INTEGER, allowNull: true },
  title: { type: DataTypes.STRING(150), allowNull: true },
  target_role: { type: DataTypes.STRING(150), allowNull: true },
  resume_data: { type: DataTypes.JSON, allowNull: true },
  last_ats_score: { type: DataTypes.DECIMAL(5, 2), allowNull: true },
}, {
  tableName: 'resumes',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Resume;
