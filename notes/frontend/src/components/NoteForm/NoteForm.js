import React, { useState } from "react";

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState("");

  const handleChange = (event) => {
    setNewNote(event.target.value);
  };

  const addNote = (event) => {
    event.preventDefault();
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    const user = JSON.parse(loggedUserJSON);
    createNote({
      content: newNote,
      important: false,
      userId: user.userId,
    });

    setNewNote("");
  };

  return (
    <div className="formDiv">
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input
          id="new-note"
          value={newNote}
          onChange={handleChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default NoteForm;
