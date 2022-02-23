const start = async (job) => {
  const { number } = job.data;
  if (number % 2 === 0) {
    throw new Error("This is an Error");
  }
  console.log(job.data);
};

module.exports = {
  start,
};
