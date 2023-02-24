import React, { useParams } from "react-router-dom";

export default function AnecdoteDetails({ anecdotes }) {
  const { id } = useParams();
  const anecdote = anecdotes.find((anecdote) => anecdote.id.toString() === id);

  return (
    <div style={{ margin: "10px" }}>
      <h1>Anecdote Details</h1>
      <p>Content: {anecdote?.content}</p>
      <p>Autor: {anecdote?.author}</p>
      <p>Url: {anecdote?.info}</p>
      <p>Votes: {anecdote?.votes}</p>
    </div>
  );
}
