const { faker } = require("@faker-js/faker");

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const dataFake = () => {
  const rowId = faker.datatype.number({ min: 1, max: 99999 });
  const employeeNumber = `${faker.datatype.number({
    min: 10000,
    max: 99999,
  })}-${faker.random.alpha({ count: 2, upcase: true })}`;
  const lastName = faker.name.lastName().toUpperCase();
  const firstName = faker.name.firstName().toUpperCase();
  const email = faker.internet.email(firstName, lastName, "mail.com");
  const positionCode = faker.random.alpha({ upcase: true, count: 10 });

  return {
    rowId,
    employeeNumber,
    lastName,
    firstName,
    email,
    positionCode,
  };
};

module.exports = {
  sleep,
  dataFake,
};
