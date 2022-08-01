module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('cableways', [
      {
        name: 'Bondinho do Pão de Açúcar',
        seats: 64,
        price: 80.99,
        departure_time: new Date('December 17, 1995 03:24:00'),
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/P%C3%A3o_de_A%C3%A7%C3%BAcar_-_the_only_way_to_get_there_-_panoramio.jpg/800px-P%C3%A3o_de_A%C3%A7%C3%BAcar_-_the_only_way_to_get_there_-_panoramio.jpg',
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('cableways', null, {});
  },
};
