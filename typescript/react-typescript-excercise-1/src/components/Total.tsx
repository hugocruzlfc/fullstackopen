import React from "react";
import { CoursePart } from "../types";

export interface TotalProps {
  courseParts: CoursePart[];
}

const Total: React.FC<TotalProps> = ({ courseParts }) => {
  return (
    <>
      <p>
        Number of exercises{" "}
        {courseParts.reduce(
          (acumulador, part) => acumulador + part.exerciseCount,
          0
        )}
      </p>
    </>
  );
};

export default Total;
