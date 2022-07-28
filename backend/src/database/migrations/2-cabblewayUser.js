module.exports = {
  /**
   * 
   * @param {import('sequelize').QueryInterface} queryInterface 
   * @param {import('sequelize').DataTypes} Sequelize 
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cablewayUsers', {
      cabblewayId: {
        allowNull: false,
        field: 'cabbleway_id',
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: { model: 'cabbleways', key: 'cabbleway_id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      userId: {
        allowNull: false,
        field: 'user_id',
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'user_id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('cableway_users');
  },
};