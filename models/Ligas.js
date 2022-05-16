module.exports = (sequelize, DataTypes) => {

  const Ligas = sequelize.define('Ligas', {
    img_liga: { // seta como null, eo app seta image padrão
      type: DataTypes.BLOB('long'),
      allowNull: true,
      defaultValue: null,
    },
    nome: { // obrigatório
      type: DataTypes.STRING,
      allowNull: false
    },
    local: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Definir',
    },
    criador: { // obrigatório no momento da criação
      type: DataTypes.STRING,
      allowNull: false,
    }
    
  });

 
  Ligas.associate = (models) => {
    // associação N -> N com users
    Ligas.belongsToMany(models.Users, {
      through: 'Ligas_has_Users',
      as : 'users_da_liga',
      foreignKey: 'Ligas_idLigas',
    });
    // associação N -> N com users
    Ligas.belongsToMany(models.Users, {
      through: 'Users_Pedidos_Ligas',
      as : 'pedidos_da_liga',
      foreignKey: 'Ligas_idLigas',
    });
    // associação 1 -> N com Jogos
    Ligas.hasMany(models.Jogos, {
      foreignKey: 'Ligas_idLigas', as: 'jogos_da_liga'
    });
    Ligas.hasOne(models.Configs_Ligas, {
      foreignKey: 'Ligas_idLigas', as: 'confg_da_liga'
    });
  };

  return Ligas;
};
