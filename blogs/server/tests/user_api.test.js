const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../app");
const api = supertest(app);
const helper = require("../utils/test_helper");
const User = require("../models/user");

beforeEach(async () => {
  await User.deleteMany({});
  for (let user of helper.initialUsers) {
    let userObject = new User(user);
    await userObject.save();
  }
});

describe("suite of test for user endpoints", () => {
  test("a no valid user can´t be add", async () => {
    const inValidUser = {
      username: "emmicruz",
      name: "Emma Cruz",
      password: "emi",
    };

    const response = await api.post("/api/users").send(inValidUser).expect(403);
    expect(response.body.error).toBe("Invalid password length, must be < 3");
  });

  //   test("a valid blog can be added", async () => {
  //     const newBlog = {
  //       title: "Blog 3",
  //       author: "Hugo Cruz",
  //       url: "http://store/blog3",
  //       likes: 25,
  //     };

  //     await api
  //       .post("/api/blogs")
  //       .send(newBlog)
  //       .expect(200)
  //       .expect("Content-Type", /application\/json/);

  //     const response = await api.get("/api/blogs");

  //     const titles = response.body.map((r) => r.title);

  //     expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
  //     expect(titles).toContain("Blog 3");
  //   });

  //   test("a valid blog can be added without like property", async () => {
  //     const newBlog = {
  //       title: "Blog 4",
  //       author: "Hugo Cruz",
  //       url: "http://store/blog4",
  //     };

  //     const response = await api
  //       .post("/api/blogs")
  //       .send(newBlog)
  //       .expect(200)
  //       .expect("Content-Type", /application\/json/);

  //     expect(response.body.likes).toBe(0);
  //   });

  //   test("a blog can´t be added without title and url properties", async () => {
  //     const newBlog = {
  //       author: "Hugo Cruz",
  //     };

  //     await api.post("/api/blogs").send(newBlog).expect(400);
  //   });
});

afterAll(() => {
  mongoose.connection.close();
});
