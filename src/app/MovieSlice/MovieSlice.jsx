import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getData, getDataWithToken} from '../../utilities/ApiCalls.jsx';

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
};

export const fetchMovieDetails = createAsyncThunk(
    'movie/getMovieDetails',
    async ({api}, thunkApi) => {
      try {
        const response = await getData(api);
        if (response.responseCode !== '000' || response.status === false) {
          return thunkApi.rejectWithValue(response);
        }
        return response;
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    },
);

export const fetchTvDetails = createAsyncThunk(
    'movie/getTvDetails',
    async ({api}, thunkApi) => {
      try {
        const response = await getData(api);
        if (response.responseCode !== '000' || response.status === false) {
          return thunkApi.rejectWithValue(response);
        }
        return response;
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    },
);

export const fetchMovieList = createAsyncThunk(
    'movie/getMovieList',
    async ({api}, thunkApi) => {
      try {
        const response = await getData(api);
        if (response.responseCode !== '000' || response.status === false) {
          return thunkApi.rejectWithValue(response);
        }
        return response;
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    },
);

export const fetchSeriesList = createAsyncThunk(
    'movie/getSeriesList',
    async ({api}, thunkApi) => {
      try {
        const response = await getData(api);
        if (response.responseCode !== '000' || response.status === false) {
          return thunkApi.rejectWithValue(response);
        }
        return response;
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    },
);

const movieSlice = createSlice({
  name: 'movie',
  initialState: inititalState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovieDetails.pending, (state) => {
      state.movieDetailsStatus = 'loading';
    }).addCase(fetchMovieDetails.fulfilled, (state, action) => {
      state.movieDetailsStatus = 'success';
      state.movieDetails = action.payload.data;
    }).addCase(fetchMovieDetails.rejected, (state, action) => {
      state.movieDetailsStatus = 'failed';
      state.movieDetailsMsg = action.payload.responseMessage;
    });

    builder.addCase(fetchMovieList.pending, (state) => {
      state.movieListStatus = 'loading';
    }).addCase(fetchMovieList.fulfilled, (state, action) => {
      state.movieListStatus = 'success';
      state.movieList = action.payload.data.movie_list;
      console.log(action);

      state.movieListTotal = action.payload.data.total_count;
    }).addCase(fetchMovieList.rejected, (state, action) => {
      state.movieListStatus = 'failed';
      state.movieListMsg = action.payload.responseMessage;
    });

    builder.addCase(fetchSeriesList.pending, (state) => {
      state.seriesListStatus = 'loading';
    }).addCase(fetchSeriesList.fulfilled, (state, action) => {
      state.seriesListStatus = 'success';

      state.seriesListMsg = action.payload.responseMessage;
      state.seriesList = action.payload.data.series_list;
      state.seriesListTotal = action.payload.data?.total_count;
    }).addCase(fetchSeriesList.rejected, (state, action) => {
      state.seriesListStatus = 'failed';
      state.seriesListMsg = action.payload.responseMessage;
    });

    builder.addCase(fetchTvDetails.pending, (state) => {
      state.tvDetailsStatus = 'loading';
    }).addCase(fetchTvDetails.fulfilled, (state, action) => {
      state.tvDetailsStatus = 'success';
      console.log(action.payload);

      state.tvDetails = action.payload.data.detail;
    }).addCase(fetchTvDetails.rejected, (state, action) => {
      state.tvDetailsStatus = 'failed';
      state.tvDetailsMsg = action.payload.responseMessage;
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

export default movieSlice.reducer;