const initializeWorker = ({ Queue, queueName, start, concurrency = 1 }) => {
  const queue = Queue(queueName);
  queue.process(queueName, concurrency, async (job, done) => {
    try {
      await start(job);
      done();
    } catch (error) {
      console.error(error);
      done(error);
    }
  });
};

module.exports = { initializeWorker };
