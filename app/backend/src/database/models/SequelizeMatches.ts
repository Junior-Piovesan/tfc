import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreateOptions,

} from 'sequelize';

import db from '.';
import SequelizeTeam from './SequelizeTeam';

export default class SequelizeMatches extends
  Model<InferAttributes<SequelizeMatches>,
  InferCreationAttributes<SequelizeMatches>> {
  declare id: CreateOptions<number>;

  declare homeTeamId: number;

  declare homeTeamGoals: number;

  declare awayTeamId:number;

  declare awayTeamGoals: number;

  declare inProgress: boolean;
}

SequelizeMatches.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_id',
  },

  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_goals',
  },

  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_id',
  },

  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_goals',
  },

  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
  underscored: true,
});

SequelizeMatches.hasMany(SequelizeTeam, { foreignKey: 'homeTeamId', as: 'home_team' });
SequelizeMatches.hasMany(SequelizeTeam, { foreignKey: 'awayTeamId', as: 'away_team' });
