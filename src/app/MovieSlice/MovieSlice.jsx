import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getData,
  getDataWithToken,
  postData,
  postMultipartData,
} from "../../utilities/ApiCalls.jsx";

const inititalState = {
  movieDetails: {},
  movieDetailsStatus: null,
  movieDetailsMsg: null,
  movieList: [],
  movieListStatus: null,
  movieListTotal: 0,
  movieListMsg: null,
  movieListPagination: null,

  seriesList: [],
  seriesListStatus: null,
  seriesListTotal: 0,
  seriesListMsg: null,
  seriesListPagination: null,

  tvDetails: {},
  tvDetailsStatus: null,
  tvDetailsMsg: null,

  listByGenre: [],
  listByGenreStatus: null,
  listByGenreMsg: null,
  listByGenreTotal: 0,
};

export const fetchMovieDetails = createAsyncThunk(
  "movie/getMovieDetails",
  async ({ api }, thunkApi) => {
    try {
      const response = await getData(api);
      if (response.responseCode !== "000" || response.status === false) {
        return thunkApi.rejectWithValue(response);
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const fetchTvDetails = createAsyncThunk(
  "movie/getTvDetails",
  async ({ api }, thunkApi) => {
    try {
      const response = await getData(api);
      if (response.responseCode !== "000" || response.status === false) {
        return thunkApi.rejectWithValue(response);
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const fetchByGenreId = createAsyncThunk(
  "movie/fetchByGenreId",
  async ({ api }, thunkApi) => {
    try {
      const response = await getData(api);
      if (response.responseCode !== "000" || response.status === false) {
        return thunkApi.rejectWithValue(response);
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const fetchMovieList = createAsyncThunk(
  "movie/getMovieList",
  async ({ api, reqData }, thunkApi) => {
    try {
      const response = await postMultipartData(api, reqData);
      // console.log(response);

      if (response.responseCode !== "000" || response.status === false) {
        return thunkApi.rejectWithValue(response);
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const fetchSeriesList = createAsyncThunk(
  "movie/getSeriesList",
  async ({ api, reqData }, thunkApi) => {
    try {
      const response = await postMultipartData(api, reqData);
      if (response.responseCode !== "000" || response.status === false) {
        return thunkApi.rejectWithValue(response);
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

const movieSlice = createSlice({
  name: "movie",
  initialState: inititalState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetails.pending, (state) => {
        state.movieDetailsStatus = "loading";
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.movieDetailsStatus = "success";
        state.movieDetails = action.payload.data;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.movieDetailsStatus = "failed";
        state.movieDetailsMsg = action.payload.responseMessage;
      });

    builder
      .addCase(fetchMovieList.pending, (state) => {
        state.movieListStatus = "loading";
      })
      .addCase(fetchMovieList.fulfilled, (state, action) => {
        state.movieListStatus = "success";
        state.movieList = action.payload.data.movie_list;
        // console.log(action);

        state.movieListTotal = action.payload.data.total_count;
      })
      .addCase(fetchMovieList.rejected, (state, action) => {
        state.movieListStatus = "failed";
        state.movieListMsg = action.payload.responseMessage;
      });

    builder
      .addCase(fetchSeriesList.pending, (state) => {
        state.seriesListStatus = "loading";
      })
      .addCase(fetchSeriesList.fulfilled, (state, action) => {
        state.seriesListStatus = "success";

        state.seriesListMsg = action.payload.responseMessage;
        state.seriesList = action.payload.data.series_list;
        state.seriesListTotal = action.payload.data?.total_count;
      })
      .addCase(fetchSeriesList.rejected, (state, action) => {
        state.seriesListStatus = "failed";
        state.seriesListMsg = action.payload.responseMessage;
      });

    builder
      .addCase(fetchTvDetails.pending, (state) => {
        state.tvDetailsStatus = "loading";
      })
      .addCase(fetchTvDetails.fulfilled, (state, action) => {
        state.tvDetailsStatus = "success";
        console.log(action.payload);

        state.tvDetails = action.payload.data.detail;
      })
      .addCase(fetchTvDetails.rejected, (state, action) => {
        state.tvDetailsStatus = "failed";
        state.tvDetailsMsg = action.payload.responseMessage;
      });

    builder
      .addCase(fetchByGenreId.pending, (state) => {
        state.listByGenreStatus = "loading";
      })
      .addCase(fetchByGenreId.fulfilled, (state, action) => {
        state.listByGenreStatus = "success";
        state.listByGenre = action.payload.data.content_genres;
        state.listByGenreTotal = action.payload.data.total_count;
        state.listByGenreMsg = action.payload.responseMessage;
      })
      .addCase(fetchByGenreId.rejected, (state, action) => {
        state.listByGenreStatus = "failed";
        state.listByGenreMsg = action.payload.responseMessage;
      });
  },
});

export const movieDetailsSelector = (state) => state.movie.movieDetails;
export const movieDetailsStatusSelector = (state) =>
  state.movie.movieDetailsStatus;
export const movieDetailsMsgSelector = (state) => state.movie.movieDetailsMsg;
export const movieListSelector = (state) => state.movie.movieList;
export const movieListTotalSelector = (state) => state.movie.movieListTotal;
export const movieListStatusSelector = (state) => state.movie.movieListStatus;
export const movieListMsgSelector = (state) => state.movie.movieListMsg;
export const seriesListSelector = (state) => state.movie.seriesList;
export const seriesListTotalSelector = (state) => state.movie.seriesListTotal;
export const seriesListStatusSelector = (state) => state.movie.seriesListStatus;
export const seriesListMsgSelector = (state) => state.movie.seriesListMsg;
export const tvDetailsSelector = (state) => state.movie.tvDetails;
export const tvDetailsStatusSelector = (state) => state.movie.tvDetailsStatus;
export const tvDetailsMsgSelector = (state) => state.movie.tvDetailsMsg;
export const listByGenreSelector = (state) => state.movie.listByGenre;
export const listByGenreStatusSelector = (state) =>
  state.movie.listByGenreStatus;
export const listByGenreTotalSelector = (state) => state.movie.listByGenreTotal;
export const listByGenreMsgSelector = (state) => state.movie.listByGenreMsg;
export default movieSlice.reducer;
