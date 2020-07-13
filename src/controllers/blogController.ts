/* eslint-disable prefer-const */
import Koa from 'koa';
import xss from 'xss';
import { REG_FOR_AT_WHO } from '../share';
import BlogService from '../services/blogService';
import UserService from '../services/userService';
import AtRelationService from '../services/atRelationService';

class BlogController {
  static async createBlog(ctx: Koa.Context) {
    let { content, image = null } = ctx.request.body;
    const { id: userId } = ctx.state.user;

    const atUserNameList: string[] = [];
    content = (content as string).replace(
      REG_FOR_AT_WHO,
      (matchStr: string, _nickName: string, userName: string) => {
        atUserNameList.push(userName);
        return matchStr;
      }
    );

    const atUserList = await UserService.getUserIdsByUsernames(atUserNameList);

    const atUserIdList = atUserList.map((user) => user.id);

    const blog = await BlogService.createBlog(userId, xss.escapeHtml(content), image);

    await AtRelationService.bulkCreateAtRelation(blog.id, atUserIdList);

    ctx.success();
  }
}

export default BlogController;
