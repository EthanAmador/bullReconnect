const { REMOVE_ON_COMPLETE = false } = process.env;

module.exports = {
  removeOnComplete: JSON.parse(REMOVE_ON_COMPLETE),
};
