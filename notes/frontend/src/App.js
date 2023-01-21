import { useState, useEffect, useRef } from "react";
//import axios from "axios";

import noteService from "./services/noteService";
import loginService from "./services/login";

import Note from "./components/Note/Note";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import NoteForm from "./components/NoteForm/NoteForm";
import Togglable from "./components/Togglable/Togglable";

const App = () => {
  const [notes, setNotes] = useState([]);
  //const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);
  const noteFormRef = useRef();

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
    // axios.get("http://localhost:3001/notes").then((response) => {
    //   setNotes(response.data);
    // });

    //  const eventHandler = (response) => {
    //    console.log("promise fulfilled");
    //    setNotes(response.data);
    //  };

    //  const promise = axios.get("http://localhost:3001/notes");
    //  promise.then(eventHandler);
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility();
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
    });
  };

  // const addNote = (event) => {
  //   event.preventDefault();
  //   const noteObject = {
  //     content: newNote,
  //     date: new Date().toISOString(),
  //     important: Math.random() > 0.5,
  //     id: notes.length + 1,
  //   };

  //   setNotes(notes.concat(noteObject));
  //   setNewNote("");
  // };

  // const addNote = (event) => {
  //   event.preventDefault();
  //   const noteObject = {
  //     content: newNote,
  //     date: new Date(),
  //     important: Math.random() < 0.5,
  //   };

  //   // axios.post("http://localhost:3001/notes", noteObject).then((response) => {
  //   //   //setNotes(notes.concat(response.data));
  //   //   setNotes([...notes, response.data]);
  //   //   setNewNote("");
  //   // });
  //   noteService.create(noteObject).then((newNote) => {
  //     // setNotes(notes.concat(response.data));
  //     setNotes([...notes, newNote]);
  //     setNewNote("");
  //   });
  // };

  // const handleNoteChange = (event) => {
  //   setNewNote(event.target.value);
  // };

  const toggleImportanceOf = (id) => {
    //  const url = `http://localhost:3001/notes/${id}`;
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    // axios.put(url, changedNote).then((response) => {
    //   setNotes(notes.map((note) => (note.id !== id ? note : response.data)));
    // });

    noteService
      .update(id, changedNote)
      .then((updateNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : updateNote)));
      })
      // .catch((error) => {
      //   alert(`the note '${note.content}' was already deleted from server`);
      //   setNotes(notes.filter((n) => n.id !== id));
      // });
      .catch(() => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      noteService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" };
    const showWhenVisible = { display: loginVisible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>login</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    );
  };

  // const noteForm = () => (
  //   <form onSubmit={addNote}>
  //     <input
  //       value={newNote}
  //       onChange={handleNoteChange}
  //     />
  //     <button type="submit">save</button>
  //   </form>
  // );

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged-in</p>
          <Togglable
            buttonLabel="new note"
            ref={noteFormRef}
          >
            <NoteForm createNote={addNote} />
          </Togglable>
        </div>
      )}
      <br />

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <h2>Notes</h2>
      <ul>
        {/* {notes.map((note) => (
          <Note
            key={note.id}
            note={note}
          />
        ))} */}
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <Footer />
    </div>
  );
};

export default App;
