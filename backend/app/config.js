"use strict";

const CONFIG = {
  PORT: process.env.API_PORT || 4100,
  DATABASE: {
    MYSQL_HOST: "mysql",
    MYSQL_USER: "root",
    MYSQL_PASSWORD: "root",
    MYSQL_DATABASE: "mydatabase",
  },
};

module.exports = CONFIG;
