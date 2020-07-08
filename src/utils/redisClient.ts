import redis from 'redis';
import { redisConfig } from '../share';

let client: redis.RedisClient;

const getRedisClient = (): Promise<redis.RedisClient> =>
  new Promise((resolve, reject) => {
    if (client) {
      return resolve(client);
    }

    client = redis.createClient(redisConfig);

    client
      .on('error', (err) => {
        console.error(err);
        reject(err);
      })
      .on('connect', () => {
        console.warn('------ Redis connection succeed ------');
        resolve(client);
      });
  });

export default getRedisClient;
