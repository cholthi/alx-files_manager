import { MongoClient } from 'mongodb';
import { env } from 'process';

class DBClient {
  constructor() {
    const host = env.DB_HOST ? env.DB_HOST : '127.0.0.1';
    const port = env.DB_PORT ? env.DB_PORT : 27017;
    const database = env.DB_DATABASE ? env.DB_DATABASE : 'files_manager';
    this.mongoClient = MongoClient(`mongodb://${host}:${port}/${database}`);
    this.mongoClient.connect();
  }

  isAlive() {
    return this.mongoClient.isConnected();
  }
}

const dbClient = new DBClient();
export default dbClient;
