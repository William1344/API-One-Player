
module.exports = (sequelize, DataTypes) => {
  const Ligas_has_Users = sequelize.define('Ligas_has_Users', {
    
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
    apelido: { // obrigatório para criar relações...
      // não pode ser igual a outros apelidos da mesma liga
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    
  });
/*
  Ligas_has_Users.associate = (models) => {
    Ligas_has_Users.hasMany (models.Users, { foreignKey : 'id', as :'assoc_lhu_user'});
    Ligas_has_Users.hasMany (models.Ligas, { foreignKey : 'id', as :'assoc_lhu_ligas'});
    
  }*/
  return  Ligas_has_Users;
};