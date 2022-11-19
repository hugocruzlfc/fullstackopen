import React from "react";

export default function ListUsers({ persons }) {
  return (
    <>
      <h2>Numbers</h2>
      <div>
        <ul>
          {persons.map((person, index) => (
            <li key={index}>
              {person.name}: {person.number}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
