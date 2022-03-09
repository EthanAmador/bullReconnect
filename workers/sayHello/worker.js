const { utils } = require("../../settings");

const start = async (job) => {
  const { number } = job.data;
  if (number % 2 === 0) {
    await utils.sleep(number * 1000);
    throw new Error("This is an Error");
  }
  await utils.sleep(number * 1000);
  const maxNumber = number * 1000000;
  let bigNumber = 0;
  for (let i = 0; i < maxNumber; i++) {
    bigNumber += maxNumber * i;
  }
  console.log(bigNumber);
  await utils.sleep(number * 1000);
};

module.exports = {
  start,
};
