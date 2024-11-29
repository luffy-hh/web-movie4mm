import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteDataWithToken,
  getDataWithToken,
  postData,
  postDataWithToken,
  postMultipartData,
} from "../../utilities/ApiCalls";

const initialState = {
  currentUser: JSON.parse(localStorage.getItem("user")),
  loginStatus: "idle",
  loginMsg: "",

  userDetailStatus: "idle",
  userDetailMsg: "",
};

export const login = createAsyncThunk(
  "user/login",
  async ({ api, userData }, thunkApi) => {
    try {
      const response = await postMultipartData(api, userData);
      if (response.responseCode === "000") {
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("token", JSON.stringify(response.api_token));
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async ({ api, data }, thunkApi) => {
    try {
      const response = await postMultipartData(api, data);
      if (response.status === true) {
        localStorage.setItem("user", JSON.stringify(response));
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk("user/logout", async (thunkApi) => {
  try {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
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
        state.loginStatus = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginStatus = "success";
        state.currentUser = action.payload.data;
        state.loginMsg = action.payload.responseMessage;
      })
      .addCase(login.rejected, (state, action) => {
        state.loginStatus = "fail";
        state.loginMsg = action.payload.responseMessage;
      })
      .addCase(logout.fulfilled, (state) => {
        state.currentUser = null;
      });
    builder
      .addCase(fetchUser.pending, (state) => {
        state.userDetailStatus = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.userDetailStatus = "success";
        state.currentUser = { ...action.payload.data, ...state.currentUser };
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.userDetailStatus = "failed";
        state.userDetailMsg = action.payload.responseMessage;
      });
  },
});

export const {} = userSlice.actions;

export const selectUser = (state) => state.user.currentUser;
export const selectLoginStatus = (state) => state.user.loginStatus;

export default userSlice.reducer;
