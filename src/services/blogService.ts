import Models from '../models';
import { PAGE_SIZE } from '../share';

class BlogService {
  static async createBlog(userId: number, content: string, image: string | null) {
    const date = new Date();
    const data = {
      userId,
      content,
      createdAt: date,
      updatedAt: date
    };

    if (image) {
      data['image'] = image;
    }

    return await Models.Blog.create(data);
  }

  static async getBlogListByUser(userName: string, pageIndex = 0, pageSize = PAGE_SIZE) {
    return Models.Blog.findAndCountAll({
      attributes: ['id', 'content', 'image', 'updatedAt'],
      limit: pageSize,
      offset: pageSize * pageIndex,
      order: [['id', 'desc']],
      include: {
        association: 'user', // 使用表之间关联关系别名，可以替代 model 和 as 的组合属性，否则 ts 类型报错
        attributes: ['userName', 'nickName', 'picture'],
        where: {
          userName
        }
      }
    });
  }
}

export default BlogService;
