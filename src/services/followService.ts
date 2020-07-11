import Models, { userHasManyFollowByUserId, userHasManyFollowByFollowerId } from '../models';

class FollowService {
  static async addFollower(userId: number, followerId: number) {
    const date = new Date();
    return await Models.Follow.create({
      userId,
      followerId,
      createdAt: date,
      updatedAt: date
    });
  }

  static async deleteFollower(userId: number, followerId: number) {
    return await Models.Follow.destroy({
      where: {
        userId,
        followerId
      }
    });
  }

  static async getFans(followerId: number) {
    return Models.User.findAndCountAll({
      attributes: ['id', 'userName', 'nickName', 'picture', 'gender'],
      order: [['id', 'desc']],
      include: {
        association: userHasManyFollowByUserId,
        attributes: [],
        where: {
          followerId
        }
      }
    });
  }

  static async getFollowers(userId: number) {
    return Models.User.findAndCountAll({
      attributes: ['id', 'userName', 'nickName', 'picture', 'gender'],
      order: [['id', 'desc']],
      include: {
        association: userHasManyFollowByFollowerId,
        attributes: [],
        where: {
          userId
        }
      }
    });
  }
}

export default FollowService;
