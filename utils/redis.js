import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.redisClient = createClient();
    this.redisClient.on('error', (error) => console.log(error));
  }

  isAlive() {
    return this.redisClient.connected;
  }
   
  async get(key) {
    const getPromise = promisify(this.redisClient.get).bind(this.redisClient);
    return getPromise(key);
  }

  async set(key, value, exp) {
    const setPromise = promisify(this.redisClient.set).bind(this.redisClient);
    return setPromise(key, value, 'EX', exp);
  }

  async del(key) {
   const delPromise = promisify(this.redisClient.del).bind(this.redisClient);
   return delPromise(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
