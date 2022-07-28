module.exports = {
  /**
   * 
   * @param {import('sequelize').QueryInterface} queryInterface 
   * @param {import('sequelize').DataTypes} Sequelize 
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cableways', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      seats: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      departureTime: {
        allowNull: false,
        field: 'departure_time',
        type: Sequelize.DATE,
      },
      image: {
        allowNull: false,
        type: Sequelize.STRING,
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('cableways');
  },
};