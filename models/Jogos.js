module.exports = (sequelize, DataTypes) => {

  const Jogos = sequelize.define('Jogos', {
    
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
    rotulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo_Jogo: {
      type: DataTypes.ENUM({values: [ 'nxn','3x3','5x5']}),
      allowNull: false,
    },
    nomeTA: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nomeTB: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    plcA: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    plcB: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },    
  });

  Jogos.associate = (models) => {

    // associação 1 -> N com Users_Game "Jogadores"
    Jogos.hasMany(models.Users_Game, {
      foreignKey: 'Jogos_idJogos', as : 'participantes_do_jogo'
    });
    // associação N -> 1 com Ligas "Pertence a"
    Jogos.belongsTo(models.Ligas, {
      foreignKey: 'Ligas_idLigas', as : 'pertence_aLiga'
    });
  };

  return Jogos;
}; // fim da função
