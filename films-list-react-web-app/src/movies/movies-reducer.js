import {createSlice} from "@reduxjs/toolkit";
import {createMoviesThunk, deleteMovieThunk, findAllMoviesThunk} from "./movies-thunks";

const initialState = {
    movies: [],
    loading: true
}

const moviesReducer = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        // 同步的 reducers 可以在这里定义
    },
    extraReducers: (builder) => {
        builder
            .addCase(findAllMoviesThunk.fulfilled, (state, action) => {
                state.movies = action.payload;
            })
            .addCase(createMoviesThunk.fulfilled, (state, action) => {
                state.movies.push(action.payload);
            })
            .addCase(deleteMovieThunk.fulfilled, (state, action) => {
                state.movies = state.movies.filter(m => m._id !== action.payload);
            });
        // 这里还可以添加对其他 actions 或状态的处理
    }
});

export default moviesReducer.reducer;
