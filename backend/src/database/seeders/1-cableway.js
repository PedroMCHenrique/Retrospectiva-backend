module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('cableways', [
      {
        name: 'Bondinho do Pão de Açúcar',
        seats: 64,
        price: 80.99,
        departure_time: new Date('December 17, 1995 03:24:00'),
        image: 'https://a.cdn-hotels.com/gdcs/production95/d1124/49c122de-7b35-453d-83c9-ead69d9816a6.jpg',
      },
      {
        name: 'Teleférico do Alemão',
        seats: 30,
        price: 15.00,
        departure_time: new Date('January 30, 2012 15:25:00'),
        image: 'http://s2.glbimg.com/nU5WLQSI7lSzvlxbz7IIJ6dl--A=/620x465/s.glbimg.com/jo/g1/f/original/2016/03/07/teleferico_bruno_itan_gov_do_estado.png',
      },
      {
        name: 'Bondinho de Santa Teresa',
        seats: 40,
        price: 8.00,
        departure_time: new Date('May 04, 2022 13:45:00'),
        image: 'https://curtarj.com.br/wp-content/uploads/cache/images/curtarj-bonde-de-santa-teresa-1/curtarj-bonde-de-santa-teresa-1-2283479759.jpg',
      },
      {
        name: 'Teleférico da providência',
        seats: '40',
        price: 10.00,
        departure_time: new Date(),
        image: 'https://www.metrocptm.com.br/wp-content/uploads/2020/03/teleferico-providencia.jpg',
      }
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('cableways', null, {});
  },
};
