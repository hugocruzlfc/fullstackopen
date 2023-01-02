import React from "react";

export default function AddForm({
  handleSubmit,
  handleChange,
  personRegister,
}) {
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
            placeholder="Write a name..."
            name="name"
            onChange={handleChange}
            value={personRegister.name}
          />
        </div>
        <div>
          number:{" "}
          <input
            type="text"
            placeholder="Write a number..."
            name="number"
            onChange={handleChange}
            value={personRegister.number}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
}
