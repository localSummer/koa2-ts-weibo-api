/* eslint-disable @typescript-eslint/camelcase */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'user',
      {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
        },
        user_name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
          comment: '用户名，唯一'
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: '密码'
        },
        nick_name: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: '昵称'
        },
        gender: {
          type: Sequelize.DECIMAL,
          allowNull: false,
          defaultValue: 3,
          comment: '性别（1 男，2 女，3 保密）'
        },
        picture: {
          type: Sequelize.STRING,
          comment: '头像，存放图片地址'
        },
        city: {
          type: Sequelize.STRING,
          comment: '城市'
        },
        is_delete: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          comment: '标识该用户是否删除'
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
    await queryInterface.dropTable('user');
  }
};
