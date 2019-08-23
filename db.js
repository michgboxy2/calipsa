"use strict";

const Sequelize = require("sequelize");
const {POSTGRES_URI} = process.env;

// const sequelize = new Sequelize(POSTGRES_URI);
const sequelize = new Sequelize('calipsa', 'admin', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:");
  });
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.game      = require('./api/v1/game/gameModel')(sequelize, Sequelize);

db.game.sequelize.sync();

module.exports = db;