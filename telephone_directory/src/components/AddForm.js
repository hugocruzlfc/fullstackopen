import React from "react";

export default function AddForm({ handleSubmit, handleName, handleNumber }) {
  return (
    <>
      <div>
        <h3> Add new </h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          name:{" "}
          <input
            type="text"
            onChange={handleName}
            placeholder="Write a name..."
            // value={newName}
          />
        </div>
        <div>
          number:{" "}
          <input
            type="text"
            onChange={handleNumber}
            placeholder="Write a number..."
            // value={newNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
}
