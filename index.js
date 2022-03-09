require("./check-version");
require("dotenv").config();
require("./workers");
const {
  settings: { PROCESS_QUEUES, addToQueue },
} = require("./bull");
const { utils } = require("./settings");

(async () => {
  try {
    let number = 0;
    while (true) {
      number++;
      const data = utils.dataFake();
      await addToQueue(
        PROCESS_QUEUES.SAY_HELLO,
        { number, ...data },
        { attempts: 3, backoff: { delay: 10000 } }
      );
      await utils.sleep(5 * 1000);
    }
  } catch (error) {
    console.error(error);
  }
})();
