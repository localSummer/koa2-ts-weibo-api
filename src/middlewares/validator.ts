import { Schema } from 'schema-typed';
import Koa from 'koa';
import * as Types from '../types';

class Validator {
  static validator(model: Schema) {
    return async (ctx: Koa.Context, next: Koa.Next) => {
      const data = ctx.request.body;
      const result = model.check(data);

      const errorItem = Object.keys(result).filter((name) => result[name].hasError);
      if (errorItem.length > 0) {
        ctx.error(Types.EErrorResponseCode.INVALID_PARAMS_CODE, result[errorItem[0]].errorMessage);
      } else {
        await next();
      }
    };
  }
}

export default Validator;
