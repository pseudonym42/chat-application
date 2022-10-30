'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('messages', [
            {
                uuid: '7648485a-6657-48d7-87d6-6a98931d3598',
                content: 'Hey man!',
                from: 'elnur',
                to: 'bob',
                createdAt: '2020-07-01 07:00:00',
                updatedAt: '2020-07-01 07:00:00',
            },
            {
                uuid: 'ae4df4f1-a428-400d-bb16-edd4237e0c47',
                content: "Coming to office today?",
                from: 'elnur',
                to: 'bob',
                createdAt: '2020-07-01 08:00:00',
                updatedAt: '2020-07-01 08:00:00',
            },
            {
                uuid: '0a7c92ac-f69c-4799-8aad-9663a4afb47d',
                content: 'Yes I am just going to be a bit late',
                from: 'bob',
                to: 'elnur',
                createdAt: '2020-07-01 09:00:00',
                updatedAt: '2020-07-01 09:00:00',
            },
            {
                uuid: '240dd560-5825-4d5d-b089-12a67e8ec84c',
                content: "Where do we meet next week?",
                from: 'bob',
                to: 'jane',
                createdAt: '2021-07-01 10:00:00',
                updatedAt: '2021-07-01 10:00:00',
            },
            {
                uuid: 'fd4cee68-5caf-4b1b-80a9-5b9add7fd863',
                content: 'What about Kings Cross?',
                from: 'jane',
                to: 'bob',
                createdAt: '2021-07-01 11:00:00',
                updatedAt: '2021-07-01 11:00:00',
            },
            {
                uuid: 'fd4cee68-5caf-4b1b-80a9-501add7fd863',
                content: 'Sounds good see you there',
                from: 'bob',
                to: 'jane',
                createdAt: '2021-07-01 12:00:00',
                updatedAt: '2021-07-01 12:00:00',
            },
            {
                uuid: 'fd4cee68-5caf-4b1b-80a9-5b9add7fd800',
                content: 'What is your estimate for your current task?',
                from: 'boss',
                to: 'bob',
                createdAt: '2020-07-01 11:00:00',
                updatedAt: '2020-07-01 11:00:00',
            },
            {
                uuid: 'fd4cee68-5caf-4b1b-80a9-5b9add7fd801',
                content: 'Note sure tbh',
                from: 'bob',
                to: 'boss',
                createdAt: '2020-07-01 11:10:00',
                updatedAt: '2020-07-01 11:10:00',
            },
            {
                uuid: 'fd4cee68-5caf-4b1b-80a9-5b9add7fd802',
                content: 'Just give a rough estiamte please',
                from: 'boss',
                to: 'bob',
                createdAt: '2020-07-01 11:30:00',
                updatedAt: '2020-07-01 11:30:00',
            },
        ])
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('messages', null, {});
    }
};
