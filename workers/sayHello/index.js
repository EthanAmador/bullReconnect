const {
  helper,
  settings: { PROCESS_QUEUES },
} = require("../../bull");
const { start } = require("./worker");

module.exports = (Queue) => {
  helper.initializeWorker({
    Queue,
    queueName: PROCESS_QUEUES.SAY_HELLO,
    start,
    concurrency: 1,
  });
};
