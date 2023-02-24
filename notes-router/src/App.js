import React, { useState } from "react";
import { Routes, Route, Link, Navigate, useMatch } from "react-router-dom";
import Note from "./components/Note";
import Login from "./components/Login";
import Notes from "./components/Notes";
import Users from "./components/Users";
import Home from "./components/Home";
import "./App.css";
import Notifications from "./components/Notifications";
import NavbarC from "./components/NavbarC";

function App() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: "HTML is easy",
      important: true,
      user: "Matti Luukkainen",
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false,
      user: "Matti Luukkainen",
    },
    {
      id: 3,
      content: "Most important methods of HTTP-protocol are GET and POST",
      important: true,
      user: "Arto Hellas",
    },
  ]);

  const match = useMatch("/notes/:id");
  const note = match
    ? notes.find((note) => note.id === Number(match.params.id))
    : null;

  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  const login = (user) => {
    setUser(user);
    setMessage(`welcome ${user}`);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  return (
    <div className="container">
      <Notifications message={message} />
      <NavbarC user={user} />

      <Routes>
        <Route
          path="/notes/:id"
          element={<Note note={note} />}
        />
        <Route
          path="/notes"
          element={<Notes notes={notes} />}
        />
        <Route
          path="/users"
          element={
            user ? (
              <Users />
            ) : (
              <Navigate
                replace
                to="/login"
              />
            )
          }
        />
        <Route
          path="/login"
          element={<Login onLogin={login} />}
        />
        <Route
          path="/"
          element={<Home />}
        />
      </Routes>
      <div>
        <br />
        <em>Note app, Department of Computer Science 2023</em>
      </div>
    </div>
  );
}

export default App;
