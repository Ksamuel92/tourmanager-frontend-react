import { createSlice } from "@reduxjs/toolkit";

const showSlice = createSlice({
  name: "show",
  initialState: { shows: [] },
  reducers: {
    addNewShow(state, action) {
      const newShow = action.payload;
      state.shows.push(newShow);
    },
    editShow(state, action) {
      const showId = action.payload.id;
      const showData = action.payload.showFormData;
      const existingShowIndex = state.shows.findIndex(
        (show) => show.id === showId
      );
      state.shows[existingShowIndex] = showData;
    },
    deleteShow(state, action) {
      const showId = action.payload.id;
      return state.shows.filter((show) => show.id !== showId);
    },
  },
});

export const showActions = showSlice.actions;

export default showSlice;
