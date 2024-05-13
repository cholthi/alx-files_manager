import { Buffer } from 'buffer';
import { v4 } from 'uuid';
import { dbClient } from '../utils/db';
import { redisClient } from '../utils/redis';
import { hashPassword } from '../utils/helpers';

class AuthController {
  static async getConnect(request, response) {
    try {
      const encodedAuthPair = request.headers.authorization.split(' ')[1];
      const decodedAuthPair = Buffer.from(encodedAuthPair, 'base64').toString().split(':');
      const _email = decodedAuthPair[0];
      const pwd = hashPassword(decodedAuthPair[1]);
      const user = await dbClient.filterUser({ email: _email });
      if (user.password !== pwd) {
        response.status(401).json({ error: 'Unathorized' }).end();
      } else {
        const _token = v4();
        await redisClient.set(`auth_${_token}`, user._id.toString(), 86400);
        response.status(200).json({ token: _token }).end();
      }
    } catch (err) {
      response.status(401).json({ error: 'Unathorized' }).end();
    }
  }

  static async getDisconnect(request, response) {
    const { token } = request;
    await redisClient.del(token);
    response.status(204).end();
  }
}

export default AuthController;
