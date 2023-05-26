'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Todos', [
            {
              id: 1,
              title: 'Primary',
              description: 'Buy Food',
              userId: 1,
            },
            {
              id: 2,
              title: 'Secondary',
              description: 'Call Her',
              userId: 1,
            },
            {
              id: 3,
              title: 'Urgent',
              description: 'Take Money',
              userId: 2,
            }
          ], {});
        },

        async down(queryInterface, Sequelize) {
          /**
           * Add commands to revert seed here.
           *
           * Example:
           * await queryInterface.bulkDelete('People', null, {});
           */
          await queryInterface.bulkDelete('Todos', null, {})
        }
    };