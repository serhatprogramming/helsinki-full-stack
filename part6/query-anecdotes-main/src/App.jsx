import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, updateAnecdote } from "./requests";

const App = () => {
  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: () => getAnecdotes(),
  });

  const queryClient = useQueryClient();

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }
  if (result.status === "error") {
    return <div>anecdote service not available due to problems in server</div>;
  }

  const anecdotes = result.data;

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

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
