import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import MovieAPI, { APIkey } from '../../common/APIs/MovieAPI';

export const fetchAsyncMovies = createAsyncThunk(
   "movies/fetchAsyncMovies",
   async (term) => {
     const response = await MovieAPI.get(
       `?apiKey=${APIkey}&s=${term}&type=movie`
     );
     return response.data;
   }
 );

 export const fetchAsyncShows = createAsyncThunk(
   "movies/fetchAsyncShows",
   async (term) => {
     const response = await MovieAPI.get(
       `?apiKey=${APIkey}&s=${term}&type=series`
     );
     return response.data;
   }
 );

 export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
   "movies/fetchAsyncMovieOrShowDetail",
   async (id) => {
     const response = await MovieAPI.get(`?apiKey=${APIkey}&i=${id}&Plot=full`);
     return response.data;
   }
 );

 const initialState = {
   movies: {},
   shows: {},
   selectMovieOrShow: {},
 };

 const movieSlice = createSlice({
   name: "movies",
   initialState,
   reducers: {
     removeSelectedMovieOrShow: (state) => {
       state.selectMovieOrShow = {};
     },
   },
   extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncMovies.pending, (state) => {
        console.log("pending...");
        state.status = "pending";
      })
      .addCase(fetchAsyncMovies.fulfilled, (state, {payload}) => {
        console.log("Fetched successfully!");
        return { ...state, movies: payload };
      })
      .addCase(fetchAsyncMovies.rejected, ()=>{
        console.log("Rejected!");
      })
      .addCase(fetchAsyncShows.fulfilled, (state, { payload }) => {
        console.log("Fetched successfully!");
        return { ...state, shows: payload };
      })
      .addCase(fetchAsyncMovieOrShowDetail.fulfilled, (state, { payload }) =>{
        console.log("Fetched Successfully!");
        return { ...state, selectMovieOrShow: payload };
      })
   },
 });
 
 export const { removeSelectedMovieOrShow } = movieSlice.actions;
 export const getAllMovies = (state) => state.movies.movies;
 export const getAllShows = (state) => state.movies.shows;
 export const getSelectedMovieOrShow = (state) => state.movies.selectMovieOrShow;
 export default movieSlice.reducer;