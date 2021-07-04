'use strict';

module.exports = (sequelize, DataTypes) => {
  var Person = sequelize.define('Person', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: DataTypes.STRING
  });
  return Person;
};
