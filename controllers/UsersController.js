import crypto from 'crypto';
import dbClient from '../utils/db';

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    // Check if the email already exists in the database
    const user = await dbClient.db.collection('users').findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'Already exist' });
    }

    // Hash the password using SHA1
    const hashedPassword = crypto
      .createHash('sha1')
      .update(password)
      .digest('hex');

    // Insert the new user into the database
    const result = await dbClient.db
      .collection('users')
      .insertOne({ email, password: hashedPassword });

    // Return the new user's email and id
    return res.status(201).json({ id: result.insertedId, email });
  }
}

export default UsersController;
