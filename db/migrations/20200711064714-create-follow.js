/* eslint-disable @typescript-eslint/camelcase */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'follow',
      {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          comment: '用户ID'
        },
        follower_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          comment: '关注用户的ID'
        },
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE
      },
      {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
      }
    );
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('follow');
  }
};
