import { createSlice } from "@reduxjs/toolkit";

// const filterReducer = (state = "", action) => {
//   switch (action.type) {
//     case "CHANGE_FILTER": {
//       return action.payload;
//     }
//     default:
//       return state;
//   }
// };

// export const handleFilter = (filter) => {
//   return {
//     type: "CHANGE_FILTER",
//     payload: filter,
//   };
// };

// export default filterReducer;

const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    handleFilter(state, action) {
      return action.payload;
    },
  },
});

export const { handleFilter } = filterSlice.actions;
export default filterSlice.reducer;

// const noteSlice = createSlice({
//   name: "notes",
//   initialState,
//   reducers: {
//     createNote(state, action) {
//       const content = action.payload;
//       state.push({
//         content,
//         important: false,
//         id: generateId(),
//       });
//     },
//     toggleImportanceOf(state, action) {
//       const id = action.payload;
//       const noteToChange = state.find((n) => n.id === id);
//       const changedNote = {
//         ...noteToChange,
//         important: !noteToChange.important,
//       };
//       return state.map((note) => (note.id !== id ? note : changedNote));
//     },
//   },
// });
