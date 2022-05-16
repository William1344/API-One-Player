module.exports = (sequelize, DataTypes) => {

  const Users_Game = sequelize.define('Users_Game', {
    Users_idUsers: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },
    Jogos_idJogos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Jogos',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    Ligas_idLigas: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Ligas',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    apelido: DataTypes.STRING,
    num_camisa: DataTypes.INTEGER,
    time: {
      type: DataTypes.ENUM({values: ['A','B','S']}),
      defaultValue: 'S'
    },
    a_2pts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    a_3pts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    reb: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    asst: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    blk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    airB: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    roubo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    bool_dec : {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    bool_cluth : {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
   
  });

  Users_Game.associate = (models) => {
    Users_Game.belongsTo(models.Users,{
      foreignKey: 'Ligas_idLigas', as : 'liga_pertencente'
    });
    Users_Game.belongsTo(models.Jogos,{
      foreignKey: 'Jogos_idJogos', as : 'jogo_pertencente'
    });
    Users_Game.belongsTo(models.Users,{
      foreignKey: 'Users_idUsers', as : 'user_pertencente'
    });

  };
  return  Users_Game;
};