const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const AtsMatchResult = sequelize.define('AtsMatchResult', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  resume_id: { type: DataTypes.INTEGER, allowNull: false },
  jd_id: { type: DataTypes.INTEGER, allowNull: false },
  match_score: { type: DataTypes.DECIMAL(5, 2), allowNull: true },
  matched_keywords: { type: DataTypes.JSON, allowNull: true },
  missing_keywords: { type: DataTypes.JSON, allowNull: true },
  suggestions: { type: DataTypes.JSON, allowNull: true },
}, {
  tableName: 'ats_match_results',
  timestamps: true,
  createdAt: 'checked_at',
  updatedAt: false,
});

module.exports = AtsMatchResult;
