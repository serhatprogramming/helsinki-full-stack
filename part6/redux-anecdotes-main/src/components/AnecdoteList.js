import { useSelector, useDispatch } from "react-redux";
import { handleVote } from "../reducers/anecdoteReducer";
import { handleNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);

  const vote = (id) => {
    dispatch(handleVote(id));
    dispatch(
      handleNotification(
        `you voted ${anecdotes.find((n) => n.id === id).content}`
      )
    );
    setTimeout(() => {
      dispatch(handleNotification(""));
    }, 5000);
  };
  return (
    <div>
      {anecdotes
        .filter((anecdote) =>
          anecdote.content.toLowerCase().includes(filter.toLowerCase())
        )
        .map((anecdote) => (
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
