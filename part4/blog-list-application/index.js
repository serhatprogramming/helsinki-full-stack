const express = require("express");
const app = require("./app");
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogsRouter);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
