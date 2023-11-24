import React from "react";
import { CoursePart } from "../types";
import assertNever from "../helpers/assertNever";

export interface PartProps {
  courseParts: CoursePart[];
}

const Part: React.FC<PartProps> = ({ courseParts }) => {
  return (
    <>
      {courseParts.map((part) => {
        switch (part.name) {
          case "Fundamentals":
            return (
              <p key={part.name}>
                {part.name} {part.exerciseCount}
              </p>
            );
          case "Using props to pass data":
            return (
              <p key={part.name}>
                {part.name} {part.exerciseCount} {part.groupProjectCount}
              </p>
            );
          case "Deeper type usage":
            return (
              <p key={part.name}>
                {part.name} {part.exerciseCount} {part.exerciseSubmissionLink}
              </p>
            );
          case "React with types":
            return (
              <p key={part.name}>
                {part.name} {part.exerciseCount} {part.description}
              </p>
            );
          default:
            return assertNever(part);
        }
      })}
    </>
  );
};

export default Part;
