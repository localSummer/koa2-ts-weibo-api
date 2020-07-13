/* eslint-disable @typescript-eslint/camelcase */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'at_relation',
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
          comment: 'AT用户的ID'
        },
        blog_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          comment: 'AT blog ID'
        },
        is_read: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          comment: '是否已读'
        },
        is_delete: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          comment: '标识改at记录是否删除'
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
    await queryInterface.dropTable('at_relation');
  }
};
