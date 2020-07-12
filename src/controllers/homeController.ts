import Koa from 'koa';
import HomeService from '../services/homeService';
import { PAGE_SIZE } from '../share';

class HomeController {
  static async getHomeBlogList(ctx: Koa.Context) {
    const { id: userId } = ctx.state.user;
    let { pageIndex } = ctx.params;
    pageIndex = parseInt(pageIndex);

    const { rows, count } = await HomeService.getHomeBlogList(userId, pageIndex, PAGE_SIZE);

    ctx.success({
      totalCount: count,
      list: rows,
      pageSize: PAGE_SIZE,
      pageIndex
    });
  }
}

export default HomeController;
