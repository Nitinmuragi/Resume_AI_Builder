const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Profile = sequelize.define('Profile', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  photo_url: { type: DataTypes.STRING(255), allowNull: true },
  address: { type: DataTypes.STRING(255), allowNull: true },
  dob: { type: DataTypes.DATEONLY, allowNull: true },
  linkedin_url: { type: DataTypes.STRING(255), allowNull: true },
  github_url: { type: DataTypes.STRING(255), allowNull: true },
  portfolio_url: { type: DataTypes.STRING(255), allowNull: true },
  summary: { type: DataTypes.TEXT, allowNull: true },
}, {
  tableName: 'profiles',
  timestamps: false,
});

module.exports = Profile;
