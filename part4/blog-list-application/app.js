const express = require("express");
const app = express();
const config = require("./utils/config");
const mongoose = require("mongoose");
const logger = require("./utils/logger");

mongoose
  .connect(config.MONGODB_URL)
  .then((result) => {
    logger.info("Database connection established");
  })
  .catch((err) => {
    logger.error("Error connecting to database");
  });

module.exports = app;
