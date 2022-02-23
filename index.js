require("./check-version");
require("dotenv").config();
require("./workers");
const {
  settings: { PROCESS_QUEUES, addToQueue },
} = require("./bull");
const { utils } = require("./settings");

(async () => {
  try {
    let cont = 0;
    while (true) {
      cont++;
      const sayHello = {
        firstName: `JUAN-${cont}`,
        lastName: `PEREZ-${cont}`,
        number: cont,
      };
      await addToQueue(PROCESS_QUEUES.SAY_HELLO, sayHello);
      await utils.sleep(30 * 1000);
    }
  } catch (error) {
    console.error(error);
  }
})();
