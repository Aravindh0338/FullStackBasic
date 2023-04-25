const Sequelize = require("sequelize");

const sequelize = new Sequelize("userregister", "root", "Password@1", {
  dialect: "mysql",
  host: "localhost",
});

sequelize.sync()

module.exports = sequelize;
