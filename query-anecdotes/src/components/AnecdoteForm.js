import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { createAnecdote } from "../services/request";
import { NotificationContext } from "../context/Notification";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const [notification, dispatch] = useContext(NotificationContext);

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData("anecdotes", anecdotes.concat(newAnecdote));
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    if (content.length < 5) {
      dispatch({
        type: "CREATE_NOTIFICATION",
        payload: "New anecdote must be at least 5 characters long",
      });
      setTimeout(() => {
        dispatch({ type: "CLOSE_NOTIFICATION" });
      }, 3000);
      return;
    }
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, vote: 0 });
    dispatch({
      type: "CREATE_NOTIFICATION",
      payload: "New anecdote created successfully",
    });
    setTimeout(() => {
      dispatch({ type: "CLOSE_NOTIFICATION" });
    }, 3000);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
