import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdoteService";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    handleVote(state, action) {
      const updatedAnecdotes = state.map((anecdote) =>
        anecdote.id !== action.payload
          ? anecdote
          : { ...anecdote, votes: anecdote.votes + 1 }
      );
      return updatedAnecdotes;
    },
    handleAddAnecdote(state, action) {
      return [...state, action.payload];
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { handleVote, handleAddAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(handleAddAnecdote(newAnecdote));
  };
};

export const castVote = (id) => {
  return async (dispatch) => {
    await anecdoteService.castVote(id);
    dispatch(handleVote(id));
  };
};

export default anecdoteSlice.reducer;

// const anecdotesAtStart = [
//   "If it hurts, do it more often",
//   "Adding manpower to a late software project makes it later!",
//   "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
//   "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
//   "Premature optimization is the root of all evil.",
//   "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
// ];

// const getId = () => (100000 * Math.random()).toFixed(0);

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//   };
// };

// const initialState = anecdotesAtStart.map(asObject);

// export const handleVote = (id) => {
//   return { type: "VOTE", payload: { id } };
// };

// export const handleAddAnecdote = (anecdote) => {
//   return { type: "ADD", payload: { anecdote: asObject(anecdote) } };
// };

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "VOTE": {
//       const updatedAnecdotes = state.map((anecdote) =>
//         anecdote.id !== action.payload.id
//           ? anecdote
//           : { ...anecdote, votes: anecdote.votes + 1 }
//       );
//       return updatedAnecdotes;
//     }
//     case "ADD": {
//       return [...state, action.payload.anecdote];
//     }
//     default:
//       return state;
//   }
// };

// export default reducer;
