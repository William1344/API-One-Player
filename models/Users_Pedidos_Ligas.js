module.exports = (sequelize, DataTypes) => {

  const Users_Pedidos_Ligas = sequelize.define('Users_Pedidos_Ligas', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
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
    Users_idUsers: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    aceite: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    solicitante_User: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    apelido: {
      type: DataTypes.STRING,
      allowNull: false,
    },    
  });

  /*
  PedidosLigas.associate = (models) => {
    // associação 1 -> N com Ligas "1 Liga pode ter N pedidos "
    PedidosLigas.belongsTo(models.Ligas, {
      foreignKey: 'Ligas_idLigas', as : 'liga'
    });
    // associação 1 -> N com Users "1 Jogador pode ter N pedidos"
    PedidosLigas.belongsTo(models.Users, {
      foreignKey: 'Users_idUsers', as : 'user'
    });
  };
  */
  return Users_Pedidos_Ligas;
}; // fim da função
