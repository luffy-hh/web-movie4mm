import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteDataWithToken,
  getDataWithToken,
  postData,
  postDataWithToken,
} from "../../utilities/ApiCalls";

const initialState = {
  currentUser: JSON.parse(localStorage.getItem("user")),
  loginLoading: false,
  loginStatus: "idle",
  loginError: false,
  loginMsg: "",
};

export const login = createAsyncThunk(
  "user/login",
  async ({ api, userData }, thunkApi) => {
    try {
      const response = await postData(api, userData);
      // console.log(api, userData);
      // console.log(response);
      if (response.status === 0) {
        return thunkApi.rejectWithValue(response);
      }
      if (response.status === 1) {
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("token", JSON.stringify(response.access_token));
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const logout = createAsyncThunk("user/logout", async (thunkApi) => {
  try {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loginLoading = true;
        state.loginStatus = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.loginStatus = "success";
        state.loginError = false;
        state.currentUser = action.payload.user;
        state.loginMsg = action.payload.message;
      })
      .addCase(login.rejected, (state, action) => {
        state.loginError = true;
        state.loginStatus = "fail";
        state.loginLoading = false;
        state.loginMsg = action.payload.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.currentUser = null;
      });
  },
});

export const {} = userSlice.actions;

export const selectUser = (state) => state.user.currentUser;
export const selectLoginLoading = (state) => state.user.loginLoading;
export const selectLoginStatus = (state) => state.user.loginStatus;
export const selectLoginError = (state) => state.user.loginError;

export default userSlice.reducer;
