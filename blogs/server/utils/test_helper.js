const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Blog 1",
    author: "Hugo Cruz",
    url: "http://store/blog1",
    likes: 10,
  },
  {
    title: "Blog 2",
    author: "Hugo Cruz",
    url: "http://store/blog2",
    likes: 20,
  },
];

const initialUsers = [
  {
    username: "hcruz",
    name: "Hugo Cruz",
    password: "hugocruz",
  },
  {
    username: "raycruz",
    name: "Ray Cruz",
    password: "raycruz",
  },
];

const VALID_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJ1c2VybmFtZSI6ImhjcnV6IiwiaWQiOiI2M2I5OGE3YzgzY2I3OGViMmJlNDU2MWYiLCJpYXQiOjE2NzMxMTU2Mjd9OApxkNIutCuc4AUqNsQQRyYRm0waBjmRsNIERs1wSpo";

const nonExistingId = async () => {
  const blog = new Blog({ content: "willremovethissoon", date: new Date() });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  initialUsers,
  VALID_TOKEN,
  nonExistingId,
  blogsInDb,
};
