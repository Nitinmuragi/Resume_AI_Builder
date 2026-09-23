const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Certification = sequelize.define('Certification', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  title: { type: DataTypes.STRING(150), allowNull: true },
  issued_by: { type: DataTypes.STRING(150), allowNull: true },
  issue_date: { type: DataTypes.DATEONLY, allowNull: true },
}, {
  tableName: 'certifications',
  timestamps: false,
});

module.exports = Certification;
