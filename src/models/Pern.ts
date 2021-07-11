import { Model } from 'sequelize';

interface PernAttributes {
  id: number;
  name: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Pern extends Model<PernAttributes> implements PernAttributes{
    id!: number;
    name!: string;
  }
  Pern.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      name: DataTypes.STRING
    }, {
    sequelize,
    modelName: 'Pern',
  });
  return Pern;
};
