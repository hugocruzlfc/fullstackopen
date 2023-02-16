import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import {
  newVoteNotification,
  closeNotification,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    const copyAnecdotes = [...anecdotes];
    if (filter.filter !== "") {
      return copyAnecdotes
        .filter((anecdote) =>
          anecdote.content.toLowerCase().includes(filter.filter.toLowerCase())
        )
        .sort((a, b) => b.votes - a.votes);
    } else {
      return copyAnecdotes.sort((a, b) => b.votes - a.votes);
    }
  });
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log("vote", id);
    dispatch(addVote(id));
    dispatch(newVoteNotification());
    setTimeout(() => {
      dispatch(closeNotification());
    }, 3000);
  };
  return (
    <div>
      <br />
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
