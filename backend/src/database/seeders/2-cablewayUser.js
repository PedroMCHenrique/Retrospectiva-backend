module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('cableway_users', [
      {
        cableway_id: 1,
        user_id: 1,
        quantity: 1
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('cableway_users', null, {});
  },
};
