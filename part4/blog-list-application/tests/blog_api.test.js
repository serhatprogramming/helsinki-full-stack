const mongoose = require("mongoose");
const app = require("../app");
const supertest = require("supertest");
const Blog = require("../models/blog");
const testHelper = require("../utils/blog_api_test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  const promiseArray = testHelper.initialBlogs.map((blog) => {
    const blogMongooseObject = new Blog(blog);
    return blogMongooseObject.save();
  });
  await Promise.all(promiseArray);
});

test("blogs returned as JSON", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("There are 6 blog instances in the database", async () => {
  const blogs = await testHelper.blogsInDb();
  expect(blogs.length).toBe(6);
});

afterAll(async () => {
  await mongoose.connection.close();
});
