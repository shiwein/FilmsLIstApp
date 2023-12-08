import { createSlice } from "@reduxjs/toolkit";
import { userLikesMovieThunk } from "./likes-thunks";

const initialState = {
  likes: [],
  loading: false,
};

export const likesSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLikesMovieThunk.fulfilled, (state, action) => {
        state.likes.push(action.payload);
      });
  },
});

