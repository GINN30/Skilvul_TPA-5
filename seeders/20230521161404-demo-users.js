'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const Users = [{
        id: 1,
        name: 'Adya',
        email: 'user1@exam.co.id',
        role: 'user',
      },
      {
        id: 2,
        name: 'Ginn',
        email: 'user2@exam.co.id',
        role: 'user',
      },
      {
        id: 3,
        name: 'Anry',
        email: 'admin1@exam.co.id',
        role: 'admin',
      }
    ];

    const passwordUser = await bcrypt.hash('user', 10);
    const passwordAdmin = await bcrypt.hash('admin', 10);

    Users.forEach(user => {
      if (user.role === 'admin') {
        user.password = passwordAdmin;
      } else {
        user.password = passwordUser;
      }
    });

    await queryInterface.bulkInsert('Users', Users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
};