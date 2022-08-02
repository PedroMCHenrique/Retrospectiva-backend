module.exports = {
  /**
   * 
   * @param {import('sequelize').QueryInterface} queryInterface 
   * @param {import('sequelize').DataTypes} Sequelize 
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cableway_users', {
      cablewayId: {
        allowNull: false,
        field: 'cableway_id',
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: { model: 'cableways', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      userId: {
        allowNull: false,
        field: 'user_id',
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('cableway_users');
  },
};