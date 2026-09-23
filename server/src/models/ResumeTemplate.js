const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ResumeTemplate = sequelize.define('ResumeTemplate', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  template_name: { type: DataTypes.STRING(100), allowNull: false },
  category: { type: DataTypes.STRING(50), allowNull: true },
  thumbnail_url: { type: DataTypes.STRING(255), allowNull: true },
  thumbnail_color: { type: DataTypes.STRING(20), allowNull: true },
  layout_config: { type: DataTypes.JSON, allowNull: true },
}, {
  tableName: 'resume_templates',
  timestamps: false,
});

module.exports = ResumeTemplate;
