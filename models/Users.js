module.exports = (sequelize, DataTypes) => {

  const Users = sequelize.define('Users', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '(xx) xxxxx-xxxx',
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PlanosId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: 'Planos',
        key: 'id',
      },
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE',
    },
    isUser_Anonimo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    codigo_resgate: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    image: {
      type: DataTypes.BLOB('long'),
      allowNull: true,
      defaultValue: 0,
    },
    num_camisa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    posicao: {
      type: DataTypes.ENUM({
        values: [
          'Definir','Armador', 'Ala', 'Ala-Armador', 'Ala-Pivô', 'Pivô' 
        ]
      }),
      allowNull: false,
      defaultValue: 'Definir',
    },
    altura: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    peso: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    envergadura: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    }
  });

  Users.associate = (models) => {
    // associação N -> N com Planos "Users da liga"
    Users.belongsToMany(models.Ligas, {
      through: 'Ligas_has_Users',
      as : 'ligas_do_user',
      foreignKey: 'Users_idUsers',
    });
    Users.belongsToMany(models.Ligas, {
      through: 'Users_Pedidos_Ligas',
      as : 'pedidos_do_user',
      foreignKey: 'Users_idUsers',
    });
    // associação 1 -> N com Users_Game "Representa suas participações em jogos"
    Users.hasMany(models.Users_Game, {
      foreignKey: 'Users_idUsers', as : 'users_game_values'
    });
    // associação 1 -> N ( 1 Plano tem N usuários )"
    Users.belongsTo(models.Planos,{
      foreignKey: 'PlanosId', as : 'plano_pertencente'
    });
   
  };
  return Users;
}; // fim da função
