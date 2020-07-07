import Koa from 'koa';
import redis from 'redis';
import { redisConfig } from '../share';

const redisClient = async (ctx: Koa.Context, next: Koa.Next) => {
  const client = redis.createClient(redisConfig);

  client
    .on('error', (err) => {
      ctx.logger.error(err);
    })
    .on('connect', () => {
      ctx.logger.warn('------ Redis connection succeed ------');
    });

  ctx.redisClient = client;

  await next();
};

export default redisClient;
