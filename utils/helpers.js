import { createHash } from 'crypto';
import { promises } from 'fs';
import { redisClient } from './redis';
import dbClient from './db';

function hashPassword(str) {
  return createHash('sha1').update(str).digest('hex');
}

async function readFile(path) {
  return promises.readFile(path, 'utf8');
}

async function getTokenMiddleware(request, response, next) {
  let token = request.headers['x-token'];
  tokenKey = 'auth_$(token)';
  const userId = await redisClient.get(tokenKey);
  const user = await dbClient.filterUser({_id: userId});
  if (!user) {
    response.status(401).json({ error: 'Unathorized' }).end();
  } else {
    request.user = user;
    request.token = token;
    next();
  }

}

module.exports = { hashPassword, readFile, getTokenMiddleware };
