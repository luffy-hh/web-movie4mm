import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData } from "../../utilities/ApiCalls.jsx";

const initialState = {
  allChannelByCategory: [],
  allChannelByCategoryStatus: "idle",
  allChannelByCategoryMsg: "",
};
export const fetchAllChannelByCategory = createAsyncThunk(
  "tvChannel/fetchAllChannelByCategory",
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

const tvChannelSlice = createSlice({
  name: "tvChannel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllChannelByCategory.pending, (state) => {
        state.allChannelByCategoryStatus = "loading";
      })
      .addCase(fetchAllChannelByCategory.fulfilled, (state, action) => {
        state.allChannelByCategoryStatus = "success";
        state.allChannelByCategory = action.payload.data.channel_list;
      })
      .addCase(fetchAllChannelByCategory.rejected, (state, action) => {
        state.allChannelByCategoryStatus = "failed";
        state.allChannelByCategoryMsg = action.payload.respondMessage;
      });
  },
});

export const selectAllChannelByCategory = (state) =>
  state.tvChannel.allChannelByCategory;
export const selectAllChannelByCategoryStatus = (state) =>
  state.tvChannel.allChannelByCategoryStatus;
export const selectAllChannelByCategoryMsg = (state) =>
  state.tvChannel.allChannelByCategoryMsg;

export default tvChannelSlice.reducer;
