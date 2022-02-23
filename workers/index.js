const { readdirSync } = require("fs");
const { settings } = require("../bull");
(() => {
  try {
    readdirSync(__dirname, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name)
      .forEach((folderName) => {
        require(`./${folderName}`)(settings.getQueue);
      });
    console.info("Workers running 🔩");
  } catch (error) {
    console.error(`💣  Error when try run workers ${error}`);
  }
})();
