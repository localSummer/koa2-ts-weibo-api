/* eslint-disable prefer-const */
import Koa from 'koa';
import { IUserInfo, EErrorResponseCode, EErrorResponseMsg } from '../types';
import UserService from '../services/userService';
import BlogService from '../services/blogService';
import { PAGE_SIZE, REDIS_BLOGS, REDIS_BLOGS_EXPIRED } from '../share';
import Helper from '../utils/helper';
import Blog from '../models/blog';

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

    const redisKey = `${REDIS_BLOGS}${PAGE_SIZE}_${pageIndex}`;

    let blogList: {
      rows: Blog[];
      count: number;
    };

    const cacheBlogList = await Helper.redisGet(redisKey);
    if (cacheBlogList) {
      blogList = JSON.parse(cacheBlogList);
    } else {
      blogList = await BlogService.getBlogListByUser(pageIndex, PAGE_SIZE, userName);
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

export default ProfileController;
