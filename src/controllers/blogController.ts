import Koa from 'koa';
import xss from 'xss';
import BlogService from '../services/blogService';

class BlogController {
  static async createBlog(ctx: Koa.Context) {
    const { content, image = null } = ctx.request.body;
    const { id: userId } = ctx.state.user;
    await BlogService.createBlog(userId, xss.escapeHtml(content), image);
    ctx.success();
  }
}

export default BlogController;
