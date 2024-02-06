import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreateOptions,
} from 'sequelize';

import db from '.';

export default class SequelizeTeam extends
  Model<InferAttributes<SequelizeTeam>,
  InferCreationAttributes<SequelizeTeam>> {
  declare id: CreateOptions<number>;

  declare teamName: string;
}

SequelizeTeam.init({

  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'team_name',
  },

}, {
  sequelize: db,
  tableName: 'teams',
  timestamps: false,
  underscored: true,
});
