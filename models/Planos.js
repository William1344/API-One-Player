module.exports = (Sequelize, DataTypes) => {
  const Planos = Sequelize.define('Planos', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    valor: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
    
  });

  Planos.associate = (models) => {
    // associação 1 -> 1 com users
    Planos.hasMany(models.Users, {
      foreignKey: 'PlanosId', as: 'users_on_plano'
    });
  };
  return Planos;
}; // fim da função
