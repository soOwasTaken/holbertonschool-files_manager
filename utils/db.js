import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    const uri = `mongodb://${host}:${port}`;
    this.client = new MongoClient(uri, { useUnifiedTopology: true });

    this.client
      .connect()
      .then(() => {
        this.db = this.client.db(database);
        console.log('Connected to MongoDB');
      })
      .catch((err) => console.error('Connection to MongoDB failed:', err));
  }

  isAlive() {
    return !!this.db;
  }

  async nbUsers() {
    return this.isAlive() ? this.db.collection('users').countDocuments() : 0;
  }

  async nbFiles() {
    return this.isAlive() ? this.db.collection('files').countDocuments() : 0;
  }
}

const dbClient = new DBClient();
export default dbClient;
