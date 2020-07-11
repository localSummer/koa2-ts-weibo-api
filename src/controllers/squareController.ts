import Koa from 'koa';
import { REDIS_SQUARE, PAGE_SIZE, REDIS_BLOGS_EXPIRED } from '../share';
import Blog from '../models/blog';
import Helper from '../utils/helper';
import BlogService from '../services/blogService';

class SquareController {
  static async getSquareBlogList(ctx: Koa.Context) {
    let { pageIndex } = ctx.params;
    pageIndex = parseInt(pageIndex);

    const redisKey = `${REDIS_SQUARE}${PAGE_SIZE}_${pageIndex}`;

    let blogList: {
      rows: Blog[];
      count: number;
    };

    const cacheBlogList = await Helper.redisGet(redisKey);
    if (cacheBlogList) {
      blogList = JSON.parse(cacheBlogList);
    } else {
      blogList = await BlogService.getBlogListByUser(pageIndex, PAGE_SIZE);
      await Helper.redisSet(redisKey, JSON.stringify(blogList), REDIS_BLOGS_EXPIRED);
    }

    ctx.success({
      totalCount: blogList.count,
      blogList: blogList.rows,
      pageSize: PAGE_SIZE,
      pageIndex
    });
  }
}

export default SquareController;
