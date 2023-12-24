import redis from "redis";

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.connected = false;
    this.client.on("error", (error) =>
      console.error(`Redis client error: ${error}`)
    );
    this.client.on("connect", () => {
      console.log("true");
      this.connected = true;
    });
  }

  isAlive() {
    return this.connected;
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (error, reply) => {
        if (error) reject(error);
        resolve(reply);
      });
    });
  }

  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, "EX", duration, (error, reply) => {
        if (error) reject(error);
        resolve(reply);
      });
    });
  }

  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (error, reply) => {
        if (error) reject(error);
        resolve(reply);
      });
    });
  }
}

const redisClient = new RedisClient();
export default redisClient;
