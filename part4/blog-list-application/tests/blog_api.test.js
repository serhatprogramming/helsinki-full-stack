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

describe("Blog list tests", () => {
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

  test("id property exist in the response", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0]).toHaveProperty("id");
  });

  test("successfully create a blog", async () => {
    const initialBlogsInDb = await testHelper.blogsInDb();
    const response = await api.post("/api/blogs").send({
      title: "New Blog",
      author: "John Blogger",
      url: "www.blog.com",
      likes: 333,
    });
    const currentBlogsInDb = await testHelper.blogsInDb();
    expect(currentBlogsInDb.length).toBe(initialBlogsInDb.length + 1);
    expect(response.body.likes).toBe(333);
    expect(response.body.title).toBe("New Blog");
  });

  test("missing `likes` property in posts default to 0", async () => {
    const response = await api.post("/api/blogs").send({
      title: "New Blog",
      author: "John Blogger",
      url: "www.blog.com",
    });
    expect(response.body.likes).toBe(0);
  });

  test("missing `title`/`url` property in posts responded by 400", async () => {
    await api
      .post("/api/blogs")
      .send({
        url: "www.blog.com",
      })
      .expect(400);
    await api
      .post("/api/blogs")
      .send({
        title: "Another Title",
      })
      .expect(400);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
