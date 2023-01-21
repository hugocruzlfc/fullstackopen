import React, { useState, useEffect, useRef } from "react";

import Blog from "./components/Blog/Blog";
import Notification from "./components/Notification";
import Login from "./components/Login";
import AddBlog from "./components/AddBlog/AddBlog";
import Togglable from "./components/Togglable";

import blogService from "./services/blogsService";

import { NOTIFICATION_INITIAL_STATE } from "./commons/localsConst";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [messageNotification, setMessageNotification] = useState(
    NOTIFICATION_INITIAL_STATE
  );
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      <h1>Blogs App</h1>
      <Notification
        message={messageNotification.message}
        notificationType={messageNotification.notificationType}
      />
      {user === null ? (
        <Togglable buttonLabel="Login">
          <Login
            setMessageNotification={setMessageNotification}
            setUser={setUser}
          />
        </Togglable>
      ) : (
        <div> {`${user.name} logged in`}</div>
      )}
      <h2>Blogs</h2>
      <div id="blogs">
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            blogs={blogs}
            setBlogs={setBlogs}
            setMessageNotification={setMessageNotification}
          />
        ))}
      </div>

      {user && (
        <Togglable
          buttonLabel="New Blog"
          ref={blogFormRef}
        >
          <AddBlog
            setMessageNotification={setMessageNotification}
            blogs={blogs}
            setBlogs={setBlogs}
            toggleVisibility={blogFormRef}
          />
        </Togglable>
      )}
    </div>
  );
};

export default App;
