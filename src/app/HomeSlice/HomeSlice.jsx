import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData } from "../../utilities/ApiCalls";

const initialState = {
  homeStatus: "idle",
  contentMsg: "",
  slider: {},
  popularStars: [],
  allGenres: [],
  featuredTvChannels: [],
  liveSport: [],
  movieList: [],

  allPopularStars: [],
  allPopularStarsStatus: "idle",
  allPopularStarsMsg: "",

  allCountry: [],
  allCountryStatus: "idle",
  allCountryMsg: "",

  allTvCategory: [],
  allTvCategoryStatus: "idle",
  allTvCategoryMsg: "",
};

export const fetchAllGenre = createAsyncThunk(
  "home/fetchAllGenre",
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

export const fetchAllCountry = createAsyncThunk(
  "home/fetchAllCountry",
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

export const fetchAllPopularStars = createAsyncThunk(
  "home/fetchAllPopularStars",
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

export const getHomeContent = createAsyncThunk(
  "home/getHomeContent",
  async ({ api }, thunkApi) => {
    try {
      const response = await getData(api);
      console.log(response);
      if (response.responseCode !== "000" || response.status === false) {
        return thunkApi.rejectWithValue(response);
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const fetchAllTvCategory = createAsyncThunk(
  "home/fetchAllTvCategory",
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

const homeSlice = createSlice({
  name: "home",
  initialState: initialState,
  reducers: {
    resetHomeStatus: (state) => {
      state.homeStatus = "idle";
      state.contentMsg = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHomeContent.fulfilled, (state, action) => {
        state.homeStatus = "success";
        state.contentMsg = action.payload.responseMessage;
        state.slider = action.payload.data.slider;
        state.popularStars = action.payload.data.popular_stars;
        state.allGenres = action.payload.data.all_genre;
        state.featuredTvChannels = action.payload.data.featured_tv_channels;
        state.liveSport = action.payload.data.live_sport;
        state.movieList = action.payload.data.movie_list;
      })
      .addCase(getHomeContent.rejected, (state, action) => {
        state.homeStatus = "failed";
        state.contentMsg = action.payload.responseMessage;
      })
      .addCase(getHomeContent.pending, (state) => {
        state.homeStatus = "loading";
      });

    builder
      .addCase(fetchAllGenre.fulfilled, (state, action) => {
        state.homeStatus = "success";
        state.contentMsg = action.payload.responseMessage;
        state.allGenres = action.payload.data.genres;
      })
      .addCase(fetchAllGenre.rejected, (state, action) => {
        state.homeStatus = "failed";
        state.contentMsg = action.payload.responseMessage;
      })
      .addCase(fetchAllGenre.pending, (state) => {
        state.homeStatus = "loading";
      });

    builder
      .addCase(fetchAllPopularStars.fulfilled, (state, action) => {
        state.allPopularStarsStatus = "success";
        state.allPopularStarsMsg = action.payload.responseMessage;
        state.allPopularStars = action.payload.data.popular_stars;
      })
      .addCase(fetchAllPopularStars.rejected, (state, action) => {
        state.allPopularStarsStatus = "failed";
        state.allPopularStarsMsg = action.payload.responseMessage;
      })
      .addCase(fetchAllPopularStars.pending, (state) => {
        state.allPopularStarsStatus = "loading";
      });

    builder
      .addCase(fetchAllCountry.fulfilled, (state, action) => {
        state.allCountryStatus = "success";
        state.allCountryMsg = action.payload.responseMessage;
        state.allCountry = action.payload.data.countries;
      })
      .addCase(fetchAllCountry.rejected, (state, action) => {
        state.allCountryStatus = "failed";
        state.allCountryMsg = action.payload.responseMessage;
      })
      .addCase(fetchAllCountry.pending, (state) => {
        state.allCountryStatus = "loading";
      });

    builder
      .addCase(fetchAllTvCategory.fulfilled, (state, action) => {
        state.allTvCategoryStatus = "success";
        state.allTvCategoryMsg = action.payload.responseMessage;
        state.allTvCategory = action.payload.data.channel_list;
      })
      .addCase(fetchAllTvCategory.rejected, (state, action) => {
        state.allTvCategoryStatus = "failed";
        state.allTvCategoryMsg = action.payload.responseMessage;
      })
      .addCase(fetchAllTvCategory.pending, (state) => {
        state.allTvCategoryStatus = "loading";
      });
  },
});

export const getHomeStatus = (state) => state.home.homeStatus;
export const getHomeMsg = (state) => state.home.contentMsg;
export const getSlider = (state) => state.home.slider;
export const getPopularStars = (state) => state.home.popularStars;
export const getAllGenres = (state) => state.home.allGenres;
export const getFeaturedTvChannels = (state) => state.home.featuredTvChannels;
export const getLiveSport = (state) => state.home.liveSport;
export const getMovieList = (state) => state.home.movieList;
export const selectAllPopularStars = (state) => state.home.allPopularStars;
export const selectAllPopularStarsStatus = (state) =>
  state.home.allPopularStarsStatus;
export const selectAllPopularStarsMsg = (state) =>
  state.home.allPopularStarsMsg;
export const selectAllCountry = (state) => state.home.allCountry;
export const selectAllCountryStatus = (state) => state.home.allCountryStatus;
export const selectAllCountryMsg = (state) => state.home.allCountryMsg;
export const selectAllTvCategory = (state) => state.home.allTvCategory;
export const selectAllTvCategoryStatus = (state) =>
  state.home.allTvCategoryStatus;
export const selectAllTvCategoryMsg = (state) => state.home.allTvCategoryMsg;

export const { resetHomeStatus } = homeSlice.actions;

export default homeSlice.reducer;
