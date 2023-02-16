import { useQuery, useMutation, useQueryClient } from "react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

import { getAnecdotes, updateAnecdote } from "./services/request";

const App = () => {
  const queryClient = useQueryClient();
  //const result = useQuery("anecdotes", getAnecdotes);
  const {
    data: anecdotes,
    isLoading,
    error,
  } = useQuery("anecdotes", getAnecdotes, {
    retry: 1,
  });

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    },
  });

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  if (error) {
    return (
      <div>
        <p>Anecdote service not available due to problem in server</p>
      </div>
    );
  }

  if (isLoading) {
    return <div>loading data...</div>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
