import React from "react";
import { Link } from "react-router-dom";

export default function Menu() {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <Link
        to="/anecdotes"
        style={padding}
      >
        anecdotes
      </Link>
      <Link
        to="/create"
        style={padding}
      >
        create new
      </Link>
      <Link
        to="/about"
        style={padding}
      >
        about
      </Link>
    </div>
  );
}
