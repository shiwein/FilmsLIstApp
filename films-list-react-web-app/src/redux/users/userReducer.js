import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, logoutThunk, registerThunk } from "./userThunks";

const userReducer = createSlice({
  name: "user",
  initialState: {
    loading: false,
    currentUser: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.error = action.error;
        state.currentUser = null;
        state.loading = false;
      })
      // Register
      .addCase(registerThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      })
      // Logout
      .addCase(logoutThunk.fulfilled, (state, action) => {
        state.currentUser = null;
      });
    // .addCase(logoutThunk.pending, (state, action) => {

    // })
    // .addCase(logoutThunk.pending, (state, action) => {

    // })
  },
});

export default userReducer.reducer;
