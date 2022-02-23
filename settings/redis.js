const Redis = require("ioredis");
const { REDIS_HOST, REDIS_PORT, REDIS_AUTH, REDIS_DB = 0 } = process.env;

let redisClient, redisSubscriber;

const observerPattern = (client) => {
  client.on("connect", () => {
    console.log("Redis Client Connect");
  });
  client.on("error", (err) => console.log("Redis Client Error", err));

  client.on("end", () => console.log("Redis Client Disconnect"));

  client.on("reconnecting", () => {
    console.log("Reconnecting =>", new Date());
  });
};

const retryStrategy = (time) => time * 500;

const createRedisClient = () =>
  new Redis({
    port: +REDIS_PORT,
    host: REDIS_HOST,
    password: REDIS_AUTH,
    db: +REDIS_DB,
    retryStrategy,
  });

module.exports = {
  createClient: function (type) {
    switch (type) {
      case "client":
        if (!redisClient) {
          redisClient = createRedisClient();
          observerPattern(redisClient);
        }
        return redisClient;
      case "subscriber":
        if (!redisSubscriber) {
          redisSubscriber = createRedisClient();
          observerPattern(redisSubscriber);
        }
        return redisSubscriber;
      case "bclient":
        const client = createRedisClient();
        observerPattern(client);
        return client;

      default:
        throw new Error("Unexpected connection type: ", type);
    }
  },
};
