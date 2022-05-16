// criar a migration para ligas
module.exports = {
  up : (queryInterface, DataTypes) => {
    return queryInterface.createTable('Ligas', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      img_liga: {
        type: DataTypes.BLOB('long'),
        allowNull: true,
        defaultValue: null,
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false
      },
      local: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Definir',
      },
      criador: {
        type: DataTypes.STRING,
        allowNull: false,
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
  down: (queryInterface) => {
    return queryInterface.dropTable('Ligas');
  }
}
