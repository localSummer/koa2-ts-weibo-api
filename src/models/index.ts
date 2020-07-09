import User from './user';
import Blog from './blog';

Blog.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user' // 定义表之间关联关系别名
});

export default {
  User,
  Blog
};
