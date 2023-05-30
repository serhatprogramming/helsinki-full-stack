import { useState } from "react";

const App = () => {
  const initialAnecdotes = [
    { anecdote: "If it hurts, do it more often.", votes: 0 },
    {
      anecdote: "Adding manpower to a late software project makes it later!",
      votes: 0,
    },
    {
      anecdote:
        "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
      votes: 0,
    },
    {
      anecdote:
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
      votes: 0,
    },
    { anecdote: "Premature optimization is the root of all evil.", votes: 0 },
    {
      anecdote:
        "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
      votes: 0,
    },
    {
      anecdote:
        "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
      votes: 0,
    },
    { anecdote: "The only way to go fast, is to go well.", votes: 0 },
  ];

  const [selected, setSelected] = useState(0);
  const [anecdotes, setAnecdotes] = useState(initialAnecdotes);

  const setRandomAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const updateVotes = () => {
    const updatedAnecdotes = [...anecdotes];
    updatedAnecdotes[selected].votes += 1;
    setAnecdotes(updatedAnecdotes);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected].anecdote} <br /> has {anecdotes[selected].votes}{" "}
      votes
      <br />
      <button onClick={updateVotes}>vote</button>
      <button onClick={setRandomAnecdote}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      {[...anecdotes].sort((a, b) => b.votes - a.votes)[0].anecdote} <br />
      has {[...anecdotes].sort((a, b) => b.votes - a.votes)[0].votes} votes
    </div>
  );
};

export default App;
