import dbClient from '../utils/db';
import { hashPassword } from '../utils/helpers';

class UsersController {
  static async postNew(request, response) {
    const { email, password } = request.body;
    if (!email || !password) {
      response.status(400).json({ error: `Missing ${email ? 'email' : 'password'}` }).end();
    } else if (await dbClient.userExists(email)) {
      response.status(400).json({ error: 'Already exists' }).end();
    } else {
      try {
        const hashedPassword = hashPassword(password);
        const insert = await dbClient.newUser(email, hashedPassword);
        const { _id } = insert.ops[0];
        const _email = insert.ops[0].email;
        response.status(201).json({ id: _id, email: _email }).end();
      } catch (err) {
        response.status(400).json({ error: err.message }).end();
      }
    }
  }

  static async getMe(request, response) {
    const { user } = request;
    delete user.password;
    user.id = user._id;
    delete user._id;
    response.status(200).json(user).end();
  }
}

export default UsersController;
