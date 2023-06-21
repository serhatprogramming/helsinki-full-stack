const mongoose = require("mongoose");
const app = require("../app");
const supertest = require("supertest");

const api = supertest(app);

test("blogs returned as JSON", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

afterAll(async () => {
  await mongoose.connection.close();
});
