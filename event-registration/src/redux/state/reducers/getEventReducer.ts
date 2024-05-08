import { createSlice } from "@reduxjs/toolkit";
import { createEvent, fetchData } from "../action-creators";
import { EventState } from "../interface";
const initialState: EventState = {
  loading: false,
  data: [],
  createdEvent: null,
  searchQuery: "",
};

export const eventSlice = createSlice({
  name: "get events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchData.rejected, (state) => {
      state.loading = false;
      state.data = [];
    });
    builder.addCase(createEvent.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createEvent.fulfilled, (state, action) => {
      state.createdEvent = action.payload;
      state.loading = false;
    });
    builder.addCase(createEvent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default eventSlice.reducer;
