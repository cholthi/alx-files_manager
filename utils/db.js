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

  async nbusers() {
    /* Returns count of the users in collection users */
    const db = this.mongoClient.db();
    const collection = db.collection('users');
    return collection.countDocuments();
  }

  async nbFiles() {
    /* Returns count of files in collection files */
    const db = this.mongoClient.db();
    const collection = db.colection('files');
    return collection.countDocuments();
  }
}

const dbClient = new DBClient();
export default dbClient;
