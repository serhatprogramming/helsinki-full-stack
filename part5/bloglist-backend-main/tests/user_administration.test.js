const bcrypt = require("bcrypt");
const User = require("../models/user");

const app = require("../app");
const supertest = require("supertest");
const helper = require("../utils/blog_api_test_helper");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("secret", 10);
  const user = new User({ username: "root", passwordHash });

  await user.save();
});

describe("Users Tests", () => {
  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("users should have unique username", async () => {
    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    await api.post("/api/users").send(newUser).expect(400);
  });

  test("users should have username and password", async () => {
    const userWOPassword = { username: "Testing" };
    await api.post("/api/users").send(userWOPassword).expect(400);
    const userWOUsername = { password: "Testing" };
    await api.post("/api/users").send(userWOUsername).expect(400);
    const userWOPandU = { name: "name" };
    await api.post("/api/users").send(userWOPandU).expect(400);
  });

  test("users should have the minimum length 3 for password and username", async () => {
    const userWShortName = { username: "12", password: "Testing" };
    await api.post("/api/users").send(userWShortName).expect(400);
    const userWShortPassword = { username: "123", password: "12" };
    await api.post("/api/users").send(userWShortPassword).expect(400);
  });
});
