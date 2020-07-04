import Koa from 'koa';
import rules from '../rules';
import * as Types from '../types';

class Validator {
  static async validLogin(ctx: Koa.Context, next: Koa.Next) {
    const result = rules.loginModel.check({
      username: 'test',
      email: 'test@qq.com',
      age: 20
    });

    if (
      (Object.keys(result) as ['username', 'email', 'age']).filter((name) => result[name].hasError)
        .length > 0
    ) {
      ctx.error(
        Types.EErrorResponseCode.INVALID_PARAMS_CODE,
        Types.EErrorResponseMsg.INVALID_PARAMS
      );
    } else {
      await next();
    }
  }

  static async validRegist(ctx: Koa.Context, next: Koa.Next) {
    const data = ctx.request.body;
    const result = rules.registModel.check(data);

    const errorItem = Object.keys(result).filter((name) => result[name].hasError);
    if (errorItem.length > 0) {
      ctx.error(Types.EErrorResponseCode.INVALID_PARAMS_CODE, result[errorItem[0]].errorMessage);
    } else {
      await next();
    }
  }
}

export default Validator;
