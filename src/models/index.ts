import User from './user';
import Blog from './blog';

Blog.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user' // 关联别名
});

export default {
  User,
  Blog
};
