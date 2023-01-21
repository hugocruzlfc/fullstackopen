import React, { useState } from "react";

import blogService from "../../services/blogsService";

import {
  FORM_INITIAL_STATE,
  NOTIFICATION_INITIAL_STATE,
} from "../../commons/localsConst";

function AddBlog({
  setMessageNotification,
  blogs,
  setBlogs,
  toggleVisibility,
}) {
  const [newBlog, setNewBlog] = useState(FORM_INITIAL_STATE);

  const handleBlogChange = (event) => {
    setNewBlog({ ...newBlog, [event.target.name]: event.target.value });
  };

  const addBlog = (event) => {
    event.preventDefault();
    toggleVisibility.current.toggleVisibility();
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    const user = JSON.parse(loggedUserJSON);
    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      userId: user.userId,
    };
    //noteFormRef.current.toggleVisibility();
    blogService.create(blogObject).then((blog) => {
      setBlogs([...blogs, blog]);
      setNewBlog(FORM_INITIAL_STATE);
      setMessageNotification({
        message: "New blog added!",
        notificationType: "done",
      });
      setTimeout(() => {
        setMessageNotification(NOTIFICATION_INITIAL_STATE);
      }, 5000);
    });
  };

  return (
    <div>
      <h2>Add new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <label>Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={newBlog.title}
            onChange={handleBlogChange}
          />
        </div>
        <div>
          <label>Author</label>
          <input
            id="author"
            name="author"
            type="text"
            value={newBlog.author}
            onChange={handleBlogChange}
          />
        </div>
        <div>
          <label>Url</label>
          <input
            id="url"
            name="url"
            type="text"
            value={newBlog.url}
            onChange={handleBlogChange}
          />
        </div>
        <button
          type="submit"
          id="save"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default AddBlog;
