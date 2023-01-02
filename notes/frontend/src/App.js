import { useState, useEffect } from "react";
//import axios from "axios";

import noteService from "./services";

import Note from "./components/Note";
import Notification from "./components/Notification";
import Footer from "./components/Footer";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

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

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date(),
      important: Math.random() < 0.5,
    };

    // axios.post("http://localhost:3001/notes", noteObject).then((response) => {
    //   //setNotes(notes.concat(response.data));
    //   setNotes([...notes, response.data]);
    //   setNewNote("");
    // });
    noteService.create(noteObject).then((newNote) => {
      // setNotes(notes.concat(response.data));
      setNotes([...notes, newNote]);
      setNewNote("");
    });
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

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
      .catch((error) => {
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

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
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
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  );
};

export default App;
