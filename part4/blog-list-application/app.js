const express = require("express");
require("express-async-errors");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const logger = require("./utils/logger");
const config = require("./utils/config");
const middleware = require("./utils/middleware");

mongoose
  .connect(config.MONGODB_URI)
  .then((result) => {
    logger.info("Database connection established");
  })
  .catch((err) => {
    logger.error("Error connecting to database");
  });

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.tokenExtractor);
app.use(middleware.userExtractor);
app.use(middleware.requestLogger);

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
