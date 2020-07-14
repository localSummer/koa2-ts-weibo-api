import Koa from 'koa';
import AtMeService from '../services/atMeService';
import { PAGE_SIZE } from '../share';
import * as Types from '../types';

class AtMeController {
  static async getAtMeCount(ctx: Koa.Context) {
    const { id: userId } = ctx.state.user;
    const count = await AtMeService.getAtMeCount(userId);
    ctx.success(count);
  }

  static async getAtMeBlogList(ctx: Koa.Context) {
    let { pageIndex } = ctx.params;
    const { id: userId } = ctx.state.user;
    pageIndex = parseInt(pageIndex);
    const { rows, count } = await AtMeService.getAtMeBlogList(userId, pageIndex, PAGE_SIZE);
    ctx.success({
      totalCount: count,
      list: rows,
      pageIndex,
      pageSize: PAGE_SIZE
    });
  }

  static async markAllAsRead(ctx: Koa.Context) {
    const { id: userId } = ctx.state.user;
    const result = await AtMeService.updateAtRelation({ isRead: true }, { userId, isRead: false });
    if (result) {
      ctx.success({
        isAllread: result
      });
    } else {
      ctx.error(
        Types.EErrorResponseCode.HAS_MARKED_READ_ERROR_CODE,
        Types.EErrorResponseMsg.HAS_MARKED_READ_ERROR,
        {
          isAllread: true
        }
      );
    }
  }

  static async markAsReadByBlogId(ctx: Koa.Context) {
    const { id: userId } = ctx.state.user;
    const { blogId } = ctx.request.body;

    const result = await AtMeService.updateAtRelation(
      {
        isRead: true
      },
      {
        userId,
        blogId,
        isRead: false
      }
    );

    if (result) {
      ctx.success({
        isRead: result
      });
    } else {
      ctx.error(
        Types.EErrorResponseCode.HAS_MARKED_READ_ERROR_CODE,
        Types.EErrorResponseMsg.HAS_MARKED_READ_ERROR,
        {
          isRead: true
        }
      );
    }
  }
}

export default AtMeController;
