import {createSlice} from "@reduxjs/toolkit";
import {profileThunk, logoutThunk, findAllUsersThunk, loginThunk, registerThunk} from "./users-thunks";

const usersReducer = createSlice({
    name: 'users',
    initialState: {
        loading: false,
        users: [],
        currentUser: null,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(findAllUsersThunk.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.currentUser = action.payload;
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.error = action.error;
                state.currentUser = null;
            })
            .addCase(registerThunk.fulfilled, (state, action) => {
                state.currentUser = action.payload;
            })
            .addCase(registerThunk.rejected, (state, action) => {
                state.error = action.error;
                state.currentUser = null;
            })
            .addCase(logoutThunk.fulfilled, (state) => {
                state.currentUser = null;
            })
            .addCase(profileThunk.fulfilled, (state, action) => {
                state.currentUser = action.payload;
            })
            .addCase(profileThunk.rejected, (state, action) => {
                state.error = action.error;
                state.currentUser = null;
            });
    },
});

export default usersReducer.reducer;