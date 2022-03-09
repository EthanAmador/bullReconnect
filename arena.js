require("dotenv").config();
const express = require("express");
const Arena = require("bull-arena");
const Bull = require("bull");
const {
  settings: { PROCESS_QUEUES },
} = require("./bull");
const {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
  ARENA_APP_PORT: port = 3000,
} = process.env;

let queues = [];

for (const key in PROCESS_QUEUES) {
  const queueName = PROCESS_QUEUES[key];
  queues.push({
    type: "bull",
    name: queueName,
    hostId: "BullReconnect",
    redis: {
      port: +REDIS_PORT,
      host: REDIS_HOST,
      password: REDIS_PASSWORD,
    },
  });
}

const arenaConfig = Arena(
  { Bull, queues },
  { basePath: "/", disableListen: true }
);

const app = express();

app.use("/", arenaConfig);

app.listen(port, () => {
  console.log(`Bull Arena Running on port ${port}`);
});
