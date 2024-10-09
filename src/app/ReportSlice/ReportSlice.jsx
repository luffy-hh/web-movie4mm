import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDataWithToken } from "../../utilities/ApiCalls";

const initialState = {
  reportList: [],
  reportListStatus: "idle",
  reportListMsg: "",

  fuelReport: [],
  fuelReportStatus: "idle",
  fuelReportMsg: "",
};

export const getReportList = createAsyncThunk(
  "report/getReportList",
  async ({ api }, thunkApi) => {
    try {
      const response = await getDataWithToken(api);
      if (response.status === 0) {
        return thunkApi.rejectWithValue(response.message);
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getFuelReports = createAsyncThunk(
  "report/getFuelReportSlice",
  async ({ api }, thunkApi) => {
    try {
      const response = await getDataWithToken(api);
      if (response.status === 0) {
        return thunkApi.rejectWithValue(response.message);
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReportList.pending, (state) => {
        state.reportListStatus = "loading";
      })
      .addCase(getReportList.fulfilled, (state, action) => {
        state.reportListStatus = "success";
        state.reportList = action.payload.data;
      })
      .addCase(getReportList.rejected, (state, action) => {
        state.reportListStatus = "fail";
        state.reportListMsg = action.payload.message;
      })
      .addCase(getFuelReports.fulfilled, (state, action) => {
        state.fuelReport = action.payload.data;
        state.fuelReportStatus = "success";
        state.fuelReportMsg = action.payload.message;
      })
      .addCase(getFuelReports.pending, (state) => {
        state.fuelReportStatus = "loading";
      })
      .addCase(getFuelReports.rejected, (state, action) => {
        state.fuelReport = action.payload.data;
        state.fuelReportStatus = "fail";
        state.fuelReportMsg = action.payload.message;
      });
  },
});
// export const {} = reportSlice.actions;
export const selectReportList = (state) => state.report.reportList;
export const selectReportStatus = (state) => state.report.reportListStatus;
export const selectReportListMsg = (state) => state.report.reportListMsg;
export const selectFuelReport = (state) => state.report.fuelReport;
export const selectFuelReportStatus = (state) => state.report.fuelReportStatus;
export const selectFuelReportMsg = (state) => state.report.fuelReportMsg;
export default reportSlice.reducer;
