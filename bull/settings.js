const Bull = require("bull");
const { redis, bull: bullConfig } = require("../settings");
const {
  JOB_NAMES_RETRY: jobNamesRetry = "",
  NUMBER_MAX_AUTORETRY: numberMaxAutoRetry = 0,
} = process.env;

const queues = {};

const getQueue = (queueName) => {
  if (!queues[queueName]) {
    queues[queueName] = new Bull(queueName, redis);
    observerPattern(queues[queueName]);
  }
  return queues[queueName];
};

const addToQueue = async (queueName, data, opts = null) => {
  const queue = getQueue(queueName);
  opts = { ...opts, ...bullConfig };
  await queue.add(queueName, data, opts);
};

const observerPattern = async (queue) => {
  queue.on("completed", function (job, result) {
    console.log(`Job ${job.id} is completed`);
  });

  queue.on("lock-extension-failed", function (job, err) {
    console.log("JOB =>", job);
    console.log(err);
  });

  queue.on("failed", async (job, err) => {
    const {
      attemptsMade,
      name: jobName,
      opts: { attempts },
      id,
    } = job;

    const jobsToRetry = jobNamesRetry.split(",");

    if (jobsToRetry.includes(jobName)) {
      const retries = attempts === 1 ? attemptsMade : attemptsMade - attempts;

      if (retries >= 0 && retries <= +numberMaxAutoRetry) {
        await job.retry();
      } else if (retries > +numberMaxAutoRetry) {
        console.error(
          `Number maximun of retries allowed for this jobId: ${id}, jobName: ${jobName}`,
          err
        );
      }
    }

    // console.log("🚀 ~ file: helper.js ~ line 27 ~ job", job);
    // // A job failed with reason `err`!
    // console.log("ERROR F =>", err);
    // const regex = /\d+/g;
    // let posibleJobIds;
    // while ((posibleJobIds = regex.exec(err)) != null) {
    //   const jobId = +posibleJobIds[0];
    //   const { name, data, opts } = job;
    //   await addToQueue(name, data);
    //   job.remove();
    // }
  });
};

const PROCESS_QUEUES = {
  SAY_HELLO: "SAY_HELLO",
};

module.exports = {
  getQueue,
  addToQueue,
  PROCESS_QUEUES,
};
