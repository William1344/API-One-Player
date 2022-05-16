module.exports = {
  up : (queryInterface, Sequelize) =>{
    return queryInterface.createTable('Planos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      valor: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ativo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    });
  },

  down : (queryInterface) => {
    return queryInterface.dropTable('Planos');
  }
};
