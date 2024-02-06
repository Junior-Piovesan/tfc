import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreateOptions,
} from 'sequelize';

import db from '.';

export default class SequelizeUser extends
  Model<InferAttributes<SequelizeUser>,
  InferCreationAttributes<SequelizeUser>> {
  declare id: CreateOptions<number>;

  declare username:string;

  declare role:string;

  declare email:string;

  declare password:string;
}

SequelizeUser.init({

  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

}, {
  sequelize: db,
  tableName: 'users',
  timestamps: false,
  underscored: true,
});
