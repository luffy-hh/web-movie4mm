import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getData,
  getDataWithToken,
  postData,
  postMultipartData,
} from "../../utilities/ApiCalls.jsx";

const inititalState = {
  movieDetails: {},
  movieDetailsStatus: "idle",
  movieDetailsMsg: null,
  movieList: [],
  movieListPerPage: 0,
  movieListStatus: "idle",
  movieListTotal: 0,
  movieListMsg: null,
  movieListPagination: null,

  addFavoriteStatus: "idle",
  addFavoriteMsg: null,

  removeFavoriteStatus: "idle",
  removeFavoriteMsg: null,

  seriesList: [],
  seriesListStatus: "idle",
  seriesListPerPage: 0,
  seriesListTotal: 0,
  seriesListMsg: null,
  seriesListPagination: null,

  tvDetails: {},
  tvDetailsStatus: "idle",
  tvDetailsMsg: null,

  listByGenre: [],
  listByGenreStatus: "idle",
  listByGenrePerPage: 0,
  listByGenreMsg: null,
  listByGenreTotal: 0,

  contentByStars: [],
  contentByStarsTotal: 0,
  contentByStarsPerPage: 0,
  contentByStarsStatus: "idle",
  contentByStarsMsg: null,

  contentByCountry: [],
  contentByCountryTotal: 0,
  contentByCountryPerPage: 0,
  contentByCountryStatus: "idle",
  contentByCountryMsg: null,

  contentByAToZ: [],
  contentByAToZPerPage: 0,
  contentByAToZTotal: 0,
  contentByAToZStatus: null,
  contentByAToZMsg: null,

  contentByYear: [],
  contentByYearTotal: 0,
  contentByYearPerPage: 0,
  contentByYearStatus: null,
  contentByYearMsg: null,

  userFavorite: [],
  userFavoriteStatus: "idle",
  userFavoriteMsg: null,
  userFavoriteTotal: 0,
  userFavoritePerPage: 0,

  isFavorite: false,
};

export const fetchContentByCountry = createAsyncThunk(
  "movie/getContentByCountry",
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

export const fetchIsFavorite = createAsyncThunk(
  "movie/isFavorite",
  async ({ api }, thunkApi) => {
    try {
      const response = await getDataWithToken(api);
      if (response.responseCode !== "000" || response.status === false) {
        return thunkApi.rejectWithValue(response);
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const removeFromFavorite = createAsyncThunk(
  "movie/removeFavorite",
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

export const addToFavorite = createAsyncThunk(
  "movie/addToFavorite",
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

export const fetchUserFavorite = createAsyncThunk(
  "movie/getUserFavorite",
  async ({ api }, thunkApi) => {
    try {
      const response = await getDataWithToken(api);
      if (response.responseCode !== "000" || response.status === false) {
        return thunkApi.rejectWithValue(response);
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const fetchContentByYear = createAsyncThunk(
  "movie/getContentByYear",
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

export const fetchContentByAToZ = createAsyncThunk(
  "movie/getContentByAToZ",
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

export const fetchContentByStars = createAsyncThunk(
  "movie/getContentByStars",
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

export const fetchMovieDetails = createAsyncThunk(
  "movie/getMovieDetails",
  async ({ api }, thunkApi) => {
    try {
      const response = await getDataWithToken(api);
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
        state.movieListPerPage = action.payload.data.per_page;
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
        state.seriesListPerPage = action.payload.data.per_page;
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
        state.listByGenrePerPage = action.payload.data.per_page;
        state.listByGenreMsg = action.payload.responseMessage;
      })
      .addCase(fetchByGenreId.rejected, (state, action) => {
        state.listByGenreStatus = "failed";
        state.listByGenreMsg = action.payload.responseMessage;
      });
    builder
      .addCase(fetchContentByStars.pending, (state) => {
        state.contentByStarsStatus = "loading";
      })
      .addCase(fetchContentByStars.fulfilled, (state, action) => {
        state.contentByStarsStatus = "success";
        state.contentByStarsPerPage = action.payload.data.per_page;
        state.contentByStars = action.payload.data.content_star;
        state.contentByStarsTotal = action.payload.data.total_count;
        state.contentByStarsMsg = action.payload.responseMessage;
      })
      .addCase(fetchContentByStars.rejected, (state, action) => {
        state.contentByStarsStatus = "failed";
        state.contentByStarsMsg = action.payload.responseMessage;
      });
    builder
      .addCase(fetchContentByCountry.pending, (state) => {
        state.contentByCountryStatus = "loading";
      })
      .addCase(fetchContentByCountry.fulfilled, (state, action) => {
        state.contentByCountryStatus = "success";
        state.contentByCountryPerPage = action.payload.data.per_page;
        state.contentByCountry = action.payload.data.content_country;
        state.contentByCountryTotal = action.payload.data.total_count;
        state.contentByCountryMsg = action.payload.responseMessage;
      })
      .addCase(fetchContentByCountry.rejected, (state, action) => {
        state.contentByCountryStatus = "failed";
        state.contentByCountryMsg = action.payload.responseMessage;
      });

    builder
      .addCase(fetchContentByAToZ.pending, (state) => {
        state.contentByAToZStatus = "loading";
      })
      .addCase(fetchContentByAToZ.fulfilled, (state, action) => {
        state.contentByAToZStatus = "success";
        state.contentByAToZPerPage = action.payload.data.per_page;
        state.contentByAToZ = action.payload.data.movie_list;
        state.contentByAToZTotal = action.payload.data.total_count;
        state.contentByAToZMsg = action.payload.responseMessage;
      })
      .addCase(fetchContentByAToZ.rejected, (state, action) => {
        state.contentByAToZStatus = "failed";
        state.contentByAToZMsg = action.payload.responseMessage;
      });
    builder
      .addCase(fetchContentByYear.fulfilled, (state, action) => {
        state.contentByYear = action.payload.data.movie_list;
        state.contentByYearPerPage = action.payload.data.per_page;
        state.contentByYearTotal = action.payload.data.total_count;
        state.contentByYearMsg = action.payload.responseMessage;
        state.contentByYearStatus = "success";
      })
      .addCase(fetchContentByYear.rejected, (state, action) => {
        state.contentByYearStatus = "failed";
        state.contentByYearMsg = action.payload.responseMessage;
      })
      .addCase(fetchContentByYear.pending, (state) => {
        state.contentByYearStatus = "loading";
      });

    builder
      .addCase(addToFavorite.pending, (state) => {
        state.addFavoriteStatus = "loading";
      })
      .addCase(addToFavorite.fulfilled, (state, action) => {
        state.addFavoriteStatus = "success";
        state.addFavoriteMsg = action.payload.responseMessage;
      })
      .addCase(addToFavorite.rejected, (state, action) => {
        state.addFavoriteStatus = "failed";
        state.addFavoriteMsg = action.payload.responseMessage;
      });
    builder
      .addCase(removeFromFavorite.pending, (state) => {
        state.removeFavoriteStatus = "loading";
      })
      .addCase(removeFromFavorite.fulfilled, (state, action) => {
        state.removeFavoriteStatus = "success";
        state.removeFavoriteMsg = action.payload.responseMessage;
      })
      .addCase(removeFromFavorite.rejected, (state, action) => {
        state.removeFavoriteStatus = "failed";
        state.removeFavoriteMsg = action.payload.responseMessage;
      });
    builder
      .addCase(fetchUserFavorite.pending, (state) => {
        state.userFavoriteStatus = "loading";
      })
      .addCase(fetchUserFavorite.fulfilled, (state, action) => {
        state.userFavoriteStatus = "success";
        state.userFavoriteMsg = action.payload.responseMessage;
        state.userFavorite = action.payload.data.favourite_list;
        state.userFavoriteTotal = action.payload.data.total_count;
        state.userFavoritePerPage = action.payload.data.per_page;
      })
      .addCase(fetchUserFavorite.rejected, (state, action) => {
        state.userFavoriteStatus = "failed";
        state.userFavoriteMsg = action.payload.responseMessage;
      });
    builder
      .addCase(fetchIsFavorite.fulfilled, (state, action) => {
        state.isFavorite = true;
      })
      .addCase(fetchIsFavorite.rejected, (state, action) => {
        state.isFavorite = false;
      });
  },
});

export const movieDetailsSelector = (state) => state.movie.movieDetails;
export const movieDetailsStatusSelector = (state) =>
  state.movie.movieDetailsStatus;
export const movieDetailsMsgSelector = (state) => state.movie.movieDetailsMsg;
export const movieListSelector = (state) => state.movie.movieList;
export const movieListPerPageSelector = (state) => state.movie.movieListPerPage;
export const movieListTotalSelector = (state) => state.movie.movieListTotal;
export const movieListStatusSelector = (state) => state.movie.movieListStatus;
export const movieListMsgSelector = (state) => state.movie.movieListMsg;
export const seriesListSelector = (state) => state.movie.seriesList;
export const seriesListPerPageSelector = (state) =>
  state.movie.seriesListPerPage;
export const seriesListTotalSelector = (state) => state.movie.seriesListTotal;
export const seriesListStatusSelector = (state) => state.movie.seriesListStatus;
export const seriesListMsgSelector = (state) => state.movie.seriesListMsg;
export const tvDetailsSelector = (state) => state.movie.tvDetails;
export const tvDetailsStatusSelector = (state) => state.movie.tvDetailsStatus;
export const tvDetailsMsgSelector = (state) => state.movie.tvDetailsMsg;
export const listByGenreSelector = (state) => state.movie.listByGenre;
export const listByGenreStatusSelector = (state) =>
  state.movie.listByGenreStatus;
export const listByGenrePerPageSelector = (state) =>
  state.movie.listByGenrePerPage;
export const listByGenreTotalSelector = (state) => state.movie.listByGenreTotal;
export const listByGenreMsgSelector = (state) => state.movie.listByGenreMsg;
export const contentByStarsSelector = (state) => state.movie.contentByStars;
export const contentByStarsPerPageSelector = (state) =>
  state.movie.contentByStarsPerPage;
export const contentByStarsStatusSelector = (state) =>
  state.movie.contentByStarsStatus;
export const contentByStarsMsgSelector = (state) =>
  state.movie.contentByStarsMsg;
export const contentByStarsTotalSelector = (state) =>
  state.movie.contentByStarsTotal;
export const contentByCountrySelector = (state) => state.movie.contentByCountry;
export const contentByCountryPerPageSelector = (state) =>
  state.movie.contentByCountryPerPage;
export const contentByCountryStatusSelector = (state) =>
  state.movie.contentByCountryStatus;
export const contentByCountryMsgSelector = (state) =>
  state.movie.contentByCountryMsg;
export const contentByCountryTotalSelector = (state) =>
  state.movie.contentByCountryTotal;
export const contentByAToZSelector = (state) => state.movie.contentByAToZ;
export const contentByAToZPerPageSelector = (state) =>
  state.movie.contentByAToZPerPage;
export const contentByAToZStatusSelector = (state) =>
  state.movie.contentByAToZStatus;
export const contentByAToZMsgSelector = (state) => state.movie.contentByAToZMsg;
export const contentByAToZTotalSelector = (state) =>
  state.movie.contentByAToZTotal;
export const contentByYearSelector = (state) => state.movie.contentByYear;
export const contentByYearPerPageSelector = (state) =>
  state.movie.contentByYearPerPage;
export const contentByYearStatusSelector = (state) =>
  state.movie.contentByYearStatus;
export const contentByYearMsgSelector = (state) => state.movie.contentByYearMsg;
export const contentByYearTotalSelector = (state) =>
  state.movie.contentByYearTotal;
export const addFavoriteStatusSelector = (state) =>
  state.movie.addFavoriteStatus;
export const addFavoriteMsgSelector = (state) => state.movie.addFavoriteMsg;
export const removeFavoriteStatusSelector = (state) =>
  state.movie.removeFavoriteStatus;
export const removeFavoriteMsgSelector = (state) =>
  state.movie.removeFavoriteMsg;
export const userFavoriteSelector = (state) => state.movie.userFavorite;
export const userFavoriteStatusSelector = (state) =>
  state.movie.userFavoriteStatus;
export const userFavoriteMsgSelector = (state) => state.movie.userFavoriteMsg;
export const userFavoritePerPageSelector = (state) =>
  state.movie.userFavoritePerPage;
export const userFavoriteTotalSelector = (state) =>
  state.movie.userFavoriteTotal;
export const isFavoriteSelector = (state) => state.movie.isFavorite;
export default movieSlice.reducer;
