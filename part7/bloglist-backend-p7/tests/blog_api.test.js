const mongoose = require("mongoose");
const app = require("../app");
const supertest = require("supertest");
const Blog = require("../models/blog");
const User = require("../models/user");
const testHelper = require("../utils/blog_api_test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(testHelper.initialBlogs);
  await User.deleteMany({});
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
    const newUser = await api.post("/api/users").send({
      username: "user1",
      password: "1234",
      name: "test user",
    });

    const loginRes = await api
      .post("/api/login")
      .send({ username: "user1", password: "1234" });

    const response = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${loginRes.body.token}`)
      .send({
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
    const newUser = await api.post("/api/users").send({
      username: "user1",
      password: "1234",
      name: "test user",
    });

    const loginRes = await api
      .post("/api/login")
      .send({ username: "user1", password: "1234" });

    const response = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${loginRes.body.token}`)
      .send({
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

  test("successfull deletion", async () => {
    const blogsInDb = await testHelper.blogsInDb();
    const newUser = await api.post("/api/users").send({
      username: "user1",
      password: "1234",
      name: "test user",
    });

    const loginRes = await api
      .post("/api/login")
      .send({ username: "user1", password: "1234" });

    const response = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${loginRes.body.token}`)
      .send({
        title: "New Blog",
        author: "John Blogger",
        url: "www.blog.com",
        likes: 333,
      });
    expect(blogsInDb.length).toBe((await testHelper.blogsInDb()).length - 1);
    await api
      .delete(`/api/blogs/${response.body.id}`)
      .set("Authorization", `Bearer ${loginRes.body.token}`)
      .expect(204);
    const currentBlogsInDb = await testHelper.blogsInDb();
    console.log("current Blogs in DB: ", currentBlogsInDb.length);
    expect(blogsInDb.length).toBe(currentBlogsInDb.length);
  });

  test("successfully increase the likes count", async () => {
    const blogsInDb = await testHelper.blogsInDb();
    const updatedBlog = await api.put(`/api/blogs/${blogsInDb[0].id}`).send({
      likes: blogsInDb[0].likes + 1000,
    });
    expect(blogsInDb[0].likes).toBe(updatedBlog.body.likes - 1000);
  });

  test("invalid id results to 400 status", async () => {
    await api.delete("/api/blogs/invalid_id").expect(400);
    await api.put("/api/blogs/invalid_id").send({ likes: 400 }).expect(400);
  });

  test("not found results to 404 status", async () => {
    await api
      .delete(`/api/blogs/${await testHelper.nonExistingId()}`)
      .expect(404);
    await api
      .put(`/api/blogs/${await testHelper.nonExistingId()}`)
      .send({ likes: 30000 })
      .expect(404);
    await api.get(`/api/blogs/${await testHelper.nonExistingId()}`).expect(404);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
