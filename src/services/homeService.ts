import Models, { blogBelongsToFollow } from '../models';

class HomeService {
  static async getHomeBlogList(userId: number, pageIndex: number, pageSize: number) {
    return await Models.Blog.findAndCountAll({
      attributes: ['id', 'content', 'image', 'updatedAt'],
      limit: pageSize,
      offset: pageSize * pageIndex,
      order: [['id', 'desc']],
      include: [
        {
          association: 'user',
          attributes: ['userName', 'nickName', 'picture']
        },
        {
          association: blogBelongsToFollow,
          attributes: [],
          where: {
            userId
          }
        }
      ]
    });
  }
}

export default HomeService;
