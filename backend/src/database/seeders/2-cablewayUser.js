module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('cablewayUsers', [
      {
        cabbleway_id: 1,
        user_id: 1,
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('cablewayUsers', null, {});
  },
};
