import React, { useEffect } from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import anecdoteService from "./services/anecdote";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    //anecdoteService.getAll().then((anecdotes) => console.log(anecdotes));
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <AnecdoteForm />
      <Filter />
      <AnecdoteList />
    </div>
  );
};

export default App;
