import { Model, DataTypes, QueryInterface} from 'sequelize'

import { Imatches } from '../../Interfaces/matches/Imatches'

export default {
  up(queryInterface:QueryInterface) {
    return queryInterface.createTable<Model<Imatches>>('matches', {
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
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'teams',
          key: 'id',
        },
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
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'teams',
          key: 'id',
        },
      },

      awayTeamGoals: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'away_team_goals',
      },

      inProgress: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: 'in_progress'
      },

    })
  },

  down(queryInterface:QueryInterface) {
    return queryInterface.dropTable('matches',{})
  }
}