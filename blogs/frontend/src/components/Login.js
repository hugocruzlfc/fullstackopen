import React, { useState } from "react";
import PropTypes from "prop-types";

import loginService from "../services/loginService";
import blogsService from "../services/blogsService";

import { NOTIFICATION_INITIAL_STATE } from "../commons/localsConst";

const Login = ({ setMessageNotification, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      blogsService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setMessageNotification({
        message: "You are successfully logged in!",
        notificationType: "done",
      });
      setTimeout(() => {
        setMessageNotification(NOTIFICATION_INITIAL_STATE);
      }, 5000);
    } catch (exception) {
      setMessageNotification({
        message: "Wrong credentials",
        notificationType: "error",
      });
      setTimeout(() => {
        setMessageNotification(NOTIFICATION_INITIAL_STATE);
      }, 5000);
    }
  };

  return (
    <div>
      {" "}
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button
          type="submit"
          id="login-button"
        >
          Login
        </button>
      </form>
    </div>
  );
};

Login.propTypes = {
  setMessageNotification: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default Login;
