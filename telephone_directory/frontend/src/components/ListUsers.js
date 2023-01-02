import React from "react";

export default function ListUsers({ persons, handleDelete }) {
  return (
    <>
      <h2>Numbers</h2>
      <div>
        <ul>
          {persons.map((person) => (
            <li key={person.id}>
              {person.name}: {person.number}
              &nbsp;
              <button onClick={() => handleDelete(person)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
