import User from './user';
import Blog from './blog';
import Follow from './follow';

Blog.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user' // 关联别名
});

export const userHasManyFollowByUserId = User.hasMany(Follow, {
  foreignKey: 'userId'
});

export const userHasManyFollowByFollowerId = User.hasMany(Follow, {
  foreignKey: 'followerId'
});

export default {
  User,
  Blog,
  Follow
};
