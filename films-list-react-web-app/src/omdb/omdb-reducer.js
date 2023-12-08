import {createSlice} from "@reduxjs/toolkit";
import {findMovieBySearchTermThunk} from "./omdb-thunks";

const initialState = {
    movies: [],
    loading: false
}

const omdbReducer = createSlice({
    name: 'omdb',
    initialState,
    reducers: {
        // 同步的 reducer 可以在这里定义
    },
    extraReducers: (builder) => {
        builder.addCase(findMovieBySearchTermThunk.fulfilled, (state, action) => {
            state.movies = action.payload;
        });
    }
});

export default omdbReducer.reducer;
