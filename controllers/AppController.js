import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppController {
  static async getStatus(request, response) {
    const statusRedis = redisClient.isAlive();
    const statusMongo = dbClient.iaAlive();
    response.set('Content-Type', 'application/json');
    response.status(200).json({ redis: statusRedis, db: statusMongo }).end();
  }

  static async getStats(request, response) {
    const users = await dbClient.nbUsers();
    const files = await dbClient.nbFiles();
    response.set('Content-Type', 'application/json');
    response.status(200).json({ users, files }).end();
  }
}

export default AppController;
