const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../app");
const api = supertest(app);
const helper = require("../utils/test_helper");
const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});
  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

describe("suite for the first tests", () => {
  test("unique identifier is called id", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].id).toBeDefined();
  });

  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "Blog 3",
      author: "Hugo Cruz",
      url: "http://store/blog3",
      likes: 25,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", helper.VALID_TOKEN)
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");

    const titles = response.body.map((r) => r.title);

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
    expect(titles).toContain("Blog 3");
  });

  test("a valid blog can be added without like property", async () => {
    const newBlog = {
      title: "Blog 4",
      author: "Hugo Cruz",
      url: "http://store/blog4",
    };

    const response = await api
      .post("/api/blogs")
      .set("Authorization", helper.VALID_TOKEN)
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.likes).toBe(0);
  });

  test("a blog can´t be added without title and url properties", async () => {
    const newBlog = {
      author: "Hugo Cruz",
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
  });
});

describe("suite Unauthorized endpoints", () => {
  test("provided token is obligatory", async () => {
    const newBlog = {
      title: "Blog 4",
      author: "Hugo Cruz",
      url: "http://store/blog4",
    };

    await api.post("/api/blogs").send(newBlog).expect(401);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
