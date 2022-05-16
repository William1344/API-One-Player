module.exports = {
  up : (queryInterface, DataTypes) => {
    return queryInterface.createTable('Users_Game', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      Users_idUsers: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      Jogos_idJogos: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Jogos',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
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
      apelido: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      num_camisa: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      time: {
        type: DataTypes.ENUM({values: ['A','B', 'S']}),
        allowNull: false,
        defaultValue: 'S',
      },
      a_2pts: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      a_3pts: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      reb: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      asst: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      blk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      airB: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      roubo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      bool_dec : {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      bool_cluth : {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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

  down : (queryInterface) => {
    return queryInterface.dropTable('Users_Game');
  }
};
