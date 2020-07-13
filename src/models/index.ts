import User from './user';
import Blog from './blog';
import Follow from './follow';
import AtRelation from './atRelation';

Blog.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user' // 关联别名
});

export const blogHasManyAtRelation = Blog.hasMany(AtRelation, {
  foreignKey: 'blogId'
});

export const blogBelongsToFollow = Blog.belongsTo(Follow, {
  foreignKey: 'userId',
  targetKey: 'followerId'
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
  Follow,
  AtRelation
};
