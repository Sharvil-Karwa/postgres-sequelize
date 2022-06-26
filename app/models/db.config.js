var config = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "12345",
  DB: "test123",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

module.exports = config;

// max and min refer to the maximum and minimum number of connections in the pool.

// acquire and idle refer to the time, in milliseconds, that a connection is kept in the pool before being removed.
