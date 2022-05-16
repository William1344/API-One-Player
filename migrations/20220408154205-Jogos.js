module.exports = {
  up : (queryInterface, DataTypes) => {
    return queryInterface.createTable('Jogos', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
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
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });
  },

  down : (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Jogos');
  }
};
