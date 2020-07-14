import Models, { blogHasManyAtRelation } from '../models';

interface IUpdateData {
  isRead?: boolean;
}

interface IWhereData {
  userId?: number;
  blogId?: number;
  isRead?: boolean;
}

class AtMeService {
  static async getAtMeCount(userId: number) {
    const { count } = await Models.AtRelation.findAndCountAll({
      where: {
        userId,
        isRead: false
      }
    });

    return count;
  }

  static async getAtMeBlogList(userId: number, pageIndex: number, pageSize: number) {
    return await Models.Blog.findAndCountAll({
      attributes: ['id', 'userId', 'content', 'image', 'updatedAt'],
      limit: pageSize,
      offset: pageIndex * pageSize,
      order: [['id', 'desc']],
      include: [
        {
          association: 'user',
          attributes: ['userName', 'nickName', 'picture', 'gender']
        },
        {
          association: blogHasManyAtRelation,
          attributes: ['userId', 'blogId'],
          where: {
            userId
          }
        }
      ]
    });
  }

  static async updateAtRelation(
    { isRead: newIsRead }: IUpdateData,
    { userId, isRead, blogId }: IWhereData
  ) {
    const updateData = {} as IUpdateData;

    if (newIsRead) {
      updateData.isRead = newIsRead;
    }

    const whereData = {} as IWhereData;

    if (userId) {
      whereData.userId = userId;
      whereData.isRead = isRead;
    }

    if (blogId) {
      whereData.blogId = blogId;
    }

    const result = await Models.AtRelation.update(updateData, {
      where: whereData
    });

    return result[0] > 0;
  }
}

export default AtMeService;
