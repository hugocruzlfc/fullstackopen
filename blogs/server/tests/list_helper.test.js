const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ];

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });
});

describe("favorite blog", () => {
  const favoriteBlog = [
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 120,
    },
  ];

  const favoriteBlogs = [
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 120,
    },
    {
      title: "Algorithms and data structure",
      author: "Edger W. Dijkstra",
      likes: 200,
    },
  ];

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.favoriteBlog(favoriteBlog);
    expect(result).toEqual(favoriteBlog[0]);
  });

  test("when list has many blog, equals the likes of that", () => {
    const result = listHelper.favoriteBlog(favoriteBlogs);
    expect(result).toEqual(favoriteBlogs[1]);
  });
});

describe("favorite author", () => {
  const blogs = [
    {
      title: "Canonical string reduction",
      author: "Edger W. Dijkstra",
      likes: 120,
    },
    {
      title: "Algorithms and data structure",
      author: "Edger W. Dijkstra",
      likes: 200,
    },
    {
      title: "Compilation examples",
      author: "Junior Drake",
      likes: 100,
    },
  ];

  const authorWithMostBlogs = {
    author: "Edger W. Dijkstra",
    blogs: 2,
  };

  const authorWithMostLikes = { author: "Edger W. Dijkstra", likes: 320 };

  test("author with more blogs", () => {
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual(authorWithMostBlogs);
  });

  test("author with more likes", () => {
    const result = listHelper.authorWithMostLikes(blogs);
    expect(result).toEqual(authorWithMostLikes);
  });
});
