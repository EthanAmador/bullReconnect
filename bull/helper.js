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

  queue.on("completed", function (job, result) {
    console.log(`Job ${job.id} is completed`);
  });

  queue.on("error", function (error) {
    console.error(error);
  });
};

module.exports = { initializeWorker };
