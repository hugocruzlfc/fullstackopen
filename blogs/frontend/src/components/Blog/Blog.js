import React, { useState } from "react";

import blogService from "../../services/blogsService";

import { NOTIFICATION_INITIAL_STATE } from "../../commons/localsConst";

const Blog = ({ blog, blogs, setBlogs, setMessageNotification }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
  const user = JSON.parse(loggedUserJSON);

  const handleAddLike = async () => {
    const updateBlogLikes = await blogService.addLike(blog.id);
    setMessageNotification({
      message: "New like!",
      notificationType: "done",
    });
    setTimeout(() => {
      setMessageNotification(NOTIFICATION_INITIAL_STATE);
    }, 5000);
    const updateBlogs = blogs.map((currentBlog) =>
      currentBlog.id === blog.id
        ? {
            ...currentBlog,
            likes: updateBlogLikes.likes,
          }
        : currentBlog
    );
    setBlogs(updateBlogs.sort((a, b) => b.likes - a.likes));
  };

  const handleDelete = async () => {
    const response = await blogService.deleteBlog(blog.id);
    if (response.status === 204) {
      const updateBlogs = blogs.filter(
        (currentBlog) => currentBlog.id !== blog.id
      );
      setBlogs(updateBlogs);
      setMessageNotification({
        message: "Blog removed!",
        notificationType: "done",
      });
      setTimeout(() => {
        setMessageNotification(NOTIFICATION_INITIAL_STATE);
      }, 5000);
    } else {
      setMessageNotification({
        message: "Impossible to delete this blog!",
        notificationType: "error",
      });
      setTimeout(() => {
        setMessageNotification(NOTIFICATION_INITIAL_STATE);
      }, 5000);
    }
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setShowMoreInfo(!showMoreInfo)}>
        {!showMoreInfo ? "View" : "Hide"}
      </button>
      {showMoreInfo && (
        <div>
          <p className="url"> Url: {blog.url}</p>
          <p className="likes">
            {" "}
            Likes: {blog.likes}{" "}
            {user && <button onClick={handleAddLike}>Like</button>}
          </p>
          <div>
            {user && (
              <button
                id="btn-delete"
                className="btn-delete"
                onClick={handleDelete}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
