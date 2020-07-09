/* eslint-disable @typescript-eslint/camelcase */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'blog',
      {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
          comment: '微博内容'
        },
        image: {
          type: Sequelize.STRING,
          comment: '图片地址'
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          comment: '用户ID'
        },
        is_Delete: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          comment: '标识该微博是否删除'
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
    await queryInterface.dropTable('blog');
  }
};
