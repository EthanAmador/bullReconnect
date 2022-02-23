const Bull = require("bull");
const { redis, bull: bullConfig } = require("../settings");

const queues = {};

const getQueue = (queueName) => {
  if (!queues[queueName]) {
    queues[queueName] = new Bull(queueName, redis);
  }
  return queues[queueName];
};

const addToQueue = async (queueName, data, opts = null) => {
  const queue = getQueue(queueName);
  opts = { ...opts, ...bullConfig };
  await queue.add(queueName, data, opts);
};

const PROCESS_QUEUES = {
  SAY_HELLO: "SAY_HELLO",
};

module.exports = {
  getQueue,
  addToQueue,
  PROCESS_QUEUES,
};
