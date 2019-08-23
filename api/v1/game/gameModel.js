"use strict";

module.exports = (sequelize, DataTypes) => {
  const game = sequelize.define("game", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    roomid: {
      type: DataTypes.STRING,
      required: true
    },

    word: {
      type: DataTypes.STRING,
      required: true
    },

    creator: {
      type: DataTypes.STRING,
      required: true
    },
    count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });

  return game;
};
