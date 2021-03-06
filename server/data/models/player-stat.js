export default (orm, DataTypes) => {
  const PlayerStat = orm.define(
    'player_stat',
    {
      first_name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      second_name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      player_price: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      player_score: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      position: {
        allowNull: false,
        type: DataTypes.ENUM('GKP', 'DEF', 'MID', 'FWD'),
      },
      goals: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      assists: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      missed_passes: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      goals_conceded: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      saves: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      yellow_cards: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      red_cards: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      code: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      club_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      transfers_in: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      transfers_out: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      injury: DataTypes.DATE,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {},
  );

  return PlayerStat;
};
