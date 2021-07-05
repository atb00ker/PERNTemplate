'use strict';

module.exports = (sequelize, DataTypes) => {
  let Pern = sequelize.define('Pern', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: DataTypes.STRING
  });
  return Pern;
};
