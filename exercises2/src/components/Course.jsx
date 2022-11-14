import React, { useState } from "react";

export default function Course({ course }) {
  const handleSetTotalExercises = () => {
    const { parts } = course;

    const total = parts.reduce((accumulator, part) => {
      accumulator = accumulator + part.exercises;
      return accumulator;
    }, 0);
    return total;
  };

  const [totalExercises, setTotalExercises] = useState(
    handleSetTotalExercises()
  );

  return (
    <div>
      <header>
        <h1>{course.name}</h1>
      </header>
      <div>
        <h2>Parts</h2>
        <div>
          <ul>
            {course.parts.map((part) => (
              <li key={part.id}>
                <p>Name: {part.name}</p>
                <span>Exercises: {part.exercises}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <hr />
          <span>Total of {totalExercises} exercises</span>
        </div>
      </div>
    </div>
  );
}
