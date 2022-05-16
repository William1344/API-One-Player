module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
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
      image: {
        type: DataTypes.BLOB('long'),
        allowNull: true,
        defaultValue: null,
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
    })
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('Users');
  }
};