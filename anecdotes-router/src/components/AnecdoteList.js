import React from "react";
import { Link } from "react-router-dom";

export default function AnecdoteList({ anecdotes }) {
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <Link
            to={`/anecdotes/${anecdote.id}`}
            key={anecdote.id}
          >
            <li>{anecdote.content}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
