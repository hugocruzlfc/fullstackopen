import React, { useState } from "react";

const MIN = 0;
const MAX = 5;
const INITIAL_STATE = [0, 0, 0, 0, 0, 0];

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [countVotes, setCountVotes] = useState(INITIAL_STATE);
  const [anecdoteMostVotes, setAnecdoteMostVotes] = useState(0);

  const getRandomArbitrary = () => {
    const index = Math.floor(Math.random() * (MAX - MIN));
    setSelected(index);
  };

  const handleVote = () => {
    const copy = [...countVotes];
    copy[selected] += 1;
    setCountVotes(copy);
    getAnecodteMostVote();
  };

  const getAnecodteMostVote = () => {
    let indexMostVote = 0;
    let valueMostVote = 0;

    for (let index = 0; index < countVotes.length; index++) {
      if (valueMostVote < countVotes[index]) {
        valueMostVote = countVotes[index];
        indexMostVote = index;
      }
    }
    setAnecdoteMostVotes(indexMostVote);
  };

  return (
    <>
      <h1>Anecdote of th day</h1>
      <div>{anecdotes[selected]}</div>
      <p>Has {countVotes[selected]} votes</p>
      <button onClick={handleVote}>Vote</button>
      <button onClick={getRandomArbitrary}>Nex anecdote</button>
      <hr />
      <h1>Anecodote with most votes</h1>
      <div>{anecdotes[anecdoteMostVotes]}</div>
      <p>Has {countVotes[anecdoteMostVotes]} votes</p>
    </>
  );
};

export default App;
