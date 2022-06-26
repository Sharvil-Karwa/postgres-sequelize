const dbConfig = require("../../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  // operatorsAliases: false means that Sequelize will not use the default Sequelize.Op class.
  // Instead, it will use the sequelize.Op class.
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
// the above code means that the sequelize variable will be an instance of the Sequelize class.
// The Sequelize class is a constructor function.
db.tut = require("./tut.model.js")(sequelize, Sequelize);
// the above code means that the tut variable will be an instance of the Tutorial model.
module.exports = db;
