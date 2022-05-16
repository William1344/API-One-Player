module.exports = (Sequelize, DataTypes) => {
  const Configs_Ligas = Sequelize.define('Configs_Ligas', {
    Ligas_idLigas:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Ligas',
        key: 'id'
      }
    },
    rebote:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    assist:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    block:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    airB:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    roubo:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    marc24s:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    auto_troca:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },    
    faltas:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    selSubs:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

  Configs_Ligas.associate = (models) => {
    // associação 1 -> 1 com users
    Configs_Ligas.belongsTo(models.Ligas, {
      foreignKey: 'Ligas_idLigas', as : 'confg_da_liga'
    });
  };
  return Configs_Ligas;
}; // fim da função
