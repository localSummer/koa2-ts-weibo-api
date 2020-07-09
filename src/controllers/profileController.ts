/* eslint-disable prefer-const */
import Koa from 'koa';
import { IUserInfo, EErrorResponseCode, EErrorResponseMsg } from '../types';
import UserService from '../services/userService';
import BlogService from '../services/blogService';
import { PAGE_SIZE } from '../share';

class ProfileController {
  static async getProfileUserInfo(ctx: Koa.Context) {
    const { userName: loginUserName } = ctx.state.user;
    const { userName: currentUserName } = ctx.params;

    let curUserInfo: IUserInfo;

    const isSelf = loginUserName === currentUserName;

    if (isSelf) {
      const { id, userName, nickName, picture, city, gender } = ctx.state.user;
      curUserInfo = {
        id,
        userName,
        nickName,
        picture,
        city,
        gender
      };
    } else {
      const existResult = await UserService.getUserInfo(currentUserName);
      if (existResult) {
        curUserInfo = existResult;
      } else {
        return ctx.error(EErrorResponseCode.USER_NOT_EXIST_CODE, EErrorResponseMsg.USER_NOT_EXIST);
      }
    }

    ctx.success({
      userInfo: curUserInfo,
      isSelf
    });
  }

  static async getProfileBlogList(ctx: Koa.Context) {
    let { userName, pageIndex } = ctx.params;

    pageIndex = parseInt(pageIndex);

    const result = await BlogService.getBlogListByUser(userName, pageIndex);

    ctx.success({
      totalCount: result.count,
      blogList: result.rows,
      pageSize: PAGE_SIZE,
      pageIndex
    });
  }
}

export default ProfileController;
