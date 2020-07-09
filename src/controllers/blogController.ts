import Koa from 'koa';
import xss from 'xss';
import BlogService from '../services/blogService';
import * as Types from '../types';

class BlogController {
  static async createBlog(ctx: Koa.Context) {
    const { content, image = null } = ctx.request.body;
    const { id: userId } = ctx.state.user;
    try {
      await BlogService.createBlog(userId, xss.escapeHtml(content), image);
      ctx.success();
    } catch (error) {
      ctx.error(
        Types.EErrorResponseCode.CREATE_BLOG_ERROR_CODE,
        error.message,
        error.stack,
        Types.EResponseStatus.SYSTEM_ERROR
      );
    }
  }
}

export default BlogController;
