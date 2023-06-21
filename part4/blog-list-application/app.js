const express = require("express");
const app = express();

const mongoose = require("mongoose");

const mongoUrl =
  "mongodb+srv://fshelsinki:fshelsinki@fshelsinki.zr3q5xl.mongodb.net/blog-list-application?retryWrites=true&w=majority";
mongoose
  .connect(mongoUrl)
  .then((result) => {
    console.log("Database connection established");
  })
  .catch((err) => {
    console.log("Error connecting to database");
  });

module.exports = app;
