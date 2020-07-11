import Koa from 'koa';
import FollowService from '../services/followService';

class FollowController {
  static async addFollower(ctx: Koa.Context) {
    const { id: loginUserId } = ctx.state.user;
    const { followerId } = ctx.request.body;

    await FollowService.addFollower(loginUserId, followerId);
    ctx.success();
  }

  static async deletefollow(ctx: Koa.Context) {
    const { userId, followerId } = ctx.request.body;
    await FollowService.deleteFollower(userId, followerId);
    ctx.success();
  }

  static async getFans(ctx: Koa.Context) {
    const { followerId } = ctx.request.body;

    const { rows, count } = await FollowService.getFans(followerId);

    ctx.success({
      fans: rows,
      totalCount: count
    });
  }

  static async getFollowers(ctx: Koa.Context) {
    const { userId } = ctx.request.body;

    const { rows, count } = await FollowService.getFollowers(userId);

    ctx.success({
      followers: rows,
      totalCount: count
    });
  }
}

export default FollowController;
