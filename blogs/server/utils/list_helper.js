const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, item) => sum + item.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 1) return blogs[0];
  else {
    let numberLikes = blogs[0].likes;
    return blogs.find((blog) => {
      if (blog.likes > numberLikes) return blog;
      else numberLikes = blog.likes;
    });
  }
};

const mostBlogs = (blogs) => {
  const authors = _.groupBy(blogs, "author");
  let authorWithMostBlogs = {
    author: " ",
    blogs: 0,
  };
  _.forEach(authors, (author, key) => {
    if (author.length > authorWithMostBlogs.blogs) {
      authorWithMostBlogs.author = key;
      authorWithMostBlogs.blogs = author.length;
    }
  });
  return authorWithMostBlogs;
};

const authorWithMostLikes = (blogs) => {
  const authors = _.groupBy(blogs, "author");
  let authorWithMostLikes = {
    author: " ",
    likes: 0,
  };
  _.forEach(authors, (author, key) => {
    const likesForAuthor = author.reduce((sum, item) => sum + item.likes, 0);
    if (likesForAuthor > authorWithMostLikes.likes) {
      authorWithMostLikes.author = key;
      authorWithMostLikes.likes = likesForAuthor;
    }
  });

  return authorWithMostLikes;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  authorWithMostLikes,
};
