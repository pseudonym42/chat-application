'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const password = await bcrypt.hash('123456', 6);
    const createdAt = new Date();
    const updatedAt = createdAt;

    await queryInterface.bulkInsert('users', [
      {
        username: 'jane',
        email: 'jane@email.com',
        password: password,
        imageUrl:
          'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2190&q=80',
        createdAt,
        updatedAt,
      },
      {
        username: 'boss',
        email: 'boss@email.com',
        password: password,
        imageUrl:
          'https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2122&q=80',
        createdAt,
        updatedAt,
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
