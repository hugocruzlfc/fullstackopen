import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {
  createAnecdoteNotification,
  closeNotification,
} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addNewAnecdote = (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    e.target.content.value = "";
    dispatch(createAnecdote(content));
    dispatch(createAnecdoteNotification());
    setTimeout(() => {
      dispatch(closeNotification());
    }, 3000);
  };

  return (
    <div>
      <h3>New Anecdote</h3>
      <form onSubmit={addNewAnecdote}>
        <input name="content" />
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
