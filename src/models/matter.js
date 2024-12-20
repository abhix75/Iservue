const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Matter = sequelize.define('Matter', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  state: {
    type: DataTypes.ENUM('gas', 'liquid', 'solid'),
    defaultValue: 'gas',
  },
  changeHistory: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: [],
  },
});

module.exports = Matter;
