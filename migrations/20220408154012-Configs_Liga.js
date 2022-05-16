module.exports = {
  up : (queryInterface, DataTypes) => {
    return queryInterface.createTable('Configs_Ligas', {
      id : {
        type : DataTypes.INTEGER,
        allowNull: false,
        primaryKey : true,
        autoIncrement : true
      },
      Ligas_idLigas : {
        type : DataTypes.INTEGER,
        allowNull: false,
        references : {
          model : 'Ligas',
          key : 'id'
        },
        onUpdate : 'CASCADE',
        onDelete : 'CASCADE'
      },
      rebts: { 
        type : DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      assts: {
        type : DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      blks: {
        type : DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      airB: {
        type : DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      tempo_24s: {
        type : DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      bordas: {
        type : DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      redondo: {
        type : DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      
    });
  },
  down : (queryInterface) => {
    return queryInterface.dropTable('Configs_Ligas');
  }
};