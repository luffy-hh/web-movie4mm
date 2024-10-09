import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteDataWithToken,
  getDataWithToken,
  postData,
  postDataWithToken,
} from "../../utilities/ApiCalls";

const initialState = {
  userList: [],
  userListStatus: "idle",
  userListMsg: "",
  userListTotal: 0,

  createUserStatus: "idle",
  createUserMsg: "",
  updateUserStatus: "idle",
  updateUserMsg: "",

  deleteUserStatus: "idle",
  deleteUserMsg: "",

  selectBoxDrivers: [],

  currentUser: JSON.parse(localStorage.getItem("user")),
  loginLoading: false,
  loginStatus: "idle",
  loginError: false,
  loginMsg: "",

  createDriverStatus: "idle",
  createDriverMsg: "",
  updateDriverStatus: "idle",
  updateDriverMsg: "",

  driversFull: [],
  getDriversStatus: "idle",
  getDriversMsg: "",

  totalDrivers: 0,

  driversList: [],
  getDriversListStatus: "idle",
  getDriversListMsg: "",

  driverDetails: {},
  driverDetailsStatus: "idle",
  driverDetailsMsg: "",

  driverDetailsHistory: {},
  driverDetailsHistoryStatus: "idle",
  driverDetailsHistoryMsg: "",
  driverDetailsHistoryTotal: 0,

  driverDetailsFuel: {},
  driverDetailsFuelStatus: "idle",
  driverDetailsFuelMsg: "",
  driverDetailsFuelTotal: 0,

  driverDetailsMaintenance: {},
  driverDetailsMaintenanceStatus: "idle",
  driverDetailsMaintenanceMsg: "",
  driverDetailsMaintenanceTotal: 0,
};

export const getUserList = createAsyncThunk(
  "user/getUserList",
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

export const createUser = createAsyncThunk(
  "user/createUser",
  async ({ api, pData }, thunkApi) => {
    try {
      const response = await postDataWithToken(api, pData);
      if (response.status === 0) {
        return thunkApi.rejectWithValue(response.message);
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ api, pData }, thunkApi) => {
    try {
      const response = await postDataWithToken(api, pData);
      if (response.status === 0) {
        return thunkApi.rejectWithValue(response.message);
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async ({ api }, thunkApi) => {
    try {
      const response = await deleteDataWithToken(api);
      if (response.status === 0) {
        return thunkApi.rejectWithValue(response.message);
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const getDriverList = createAsyncThunk(
  "user/getDriverList",
  async ({ api }, thunkApi) => {
    try {
      const response = await getDataWithToken(api);
      // console.log(response);
      if (response.status === 0) {
        return thunkApi.rejectWithValue(response);
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getDriverDetails = createAsyncThunk(
  "user/getDriverDetails",
  async ({ api }, thunkApi) => {
    try {
      const response = await getDataWithToken(api);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getDriverDetailsHistory = createAsyncThunk(
  "user/getDriverDetailsHistory",
  async ({ api }, thunkApi) => {
    try {
      const response = await getDataWithToken(api);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const getDriverDetailsFuel = createAsyncThunk(
  "user/getDriverDetailsFuel",
  async ({ api }, thunkApi) => {
    try {
      const response = await getDataWithToken(api);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const getDriverDetailsMaintenance = createAsyncThunk(
  "user/getDriverDetailsMaintenance",
  async ({ api }, thunkApi) => {
    try {
      const response = await getDataWithToken(api);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getDriverListPaginate = createAsyncThunk(
  "user/getDriverPaginate",
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
  }
);
export const logout = createAsyncThunk("user/logout", async (thunkApi) => {
  try {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const createDriver = createAsyncThunk(
  "user/createDriver",
  async ({ api, pData }, thunkApi) => {
    try {
      const response = await postDataWithToken(api, pData);
      if (response.status === 0) {
        return thunkApi.rejectWithValue(response.message);
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateDriver = createAsyncThunk(
  "user/updateDriver",
  async ({ api, pData }, thunkApi) => {
    try {
      const response = await postDataWithToken(api, pData);
      if (response.status === 0) {
        return thunkApi.rejectWithValue(response.message);
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    setSelectBoxDrivers: (state, action) => {
      state.selectBoxDrivers = action.payload;
    },
    resetDeleteUserStatus: (state) => {
      // console.log("work");
      state.deleteUserStatus = "idle";
    },
    resetCreateUserStatus: (state) => {
      state.createUserStatus = "idle";
    },
    resetDriverUpdateStats: (state) => {
      state.updateDriverStatus = "idle";
    },
    resetUpdateUserStatus: (state) => {
      state.updateUserStatus = "idle";
    },
  },
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
      })
      .addCase(getDriverList.pending, (state) => {
        state.getDriversStatus = "loading";
      })
      .addCase(getDriverList.fulfilled, (state, action) => {
        state.getDriversStatus = "success";
        // state.loginError = false;
        state.driversFull = action.payload.driver;
        state.getDriversMsg = action.payload.message;
        // state.loginMsg = "Success";
      })
      .addCase(getDriverList.rejected, (state, action) => {
        state.getDriversStatus = "fail";
        state.getDriversMsg = action.payload.message;
      })
      .addCase(getDriverDetails.pending, (state) => {
        state.driverDetailsStatus = "loading";
      })
      .addCase(getDriverDetails.fulfilled, (state, action) => {
        state.driverDetailsStatus = "success";
        // state.loginError = false;
        state.driverDetails = action.payload;
        // state.totalDrivers = action.payload.data.total;
        // state.getDriversDetailsMsg = action.payload.message;
        // state.loginMsg = "Success";
      })
      .addCase(getDriverDetails.rejected, (state, action) => {
        state.driverDetailsStatus = "fail";
        state.driverDetailsMsg = action.payload.message;
      })
      .addCase(getDriverListPaginate.pending, (state) => {
        state.getDriversListStatus = "loading";
      })
      .addCase(getDriverListPaginate.fulfilled, (state, action) => {
        state.getDriversListStatus = "success";
        // state.loginError = false;
        state.driversList = action.payload.data.data;
        state.totalDrivers = action.payload.data.total;
        state.getDriversListMsg = action.payload.message;
        // state.loginMsg = "Success";
      })
      .addCase(getDriverListPaginate.rejected, (state, action) => {
        state.getDriversListStatus = "fail";
        state.getDriversListMsg = action.payload.message;
      })
      .addCase(getDriverDetailsHistory.pending, (state) => {
        state.driverDetailsHistoryStatus = "loading";
      })
      .addCase(getDriverDetailsHistory.fulfilled, (state, action) => {
        state.driverDetailsHistoryStatus = "success";
        // state.loginError = false;
        state.driverDetailsHistory = action.payload;
        state.driverDetailsHistoryTotal = action.payload.report.total;
      })
      .addCase(getDriverDetailsHistory.rejected, (state, action) => {
        state.driverDetailsHistoryStatus = "fail";
        state.driverDetailsHistoryMsg = action.payload.message;
      })
      .addCase(getDriverDetailsFuel.pending, (state) => {
        state.driverDetailsFuelStatus = "loading";
      })
      .addCase(getDriverDetailsFuel.fulfilled, (state, action) => {
        state.driverDetailsFuelStatus = "success";
        // state.loginError = false;
        state.driverDetailsFuel = action.payload;
        state.driverDetailsFuelTotal = action.payload.fuel.total;
      })
      .addCase(getDriverDetailsFuel.rejected, (state, action) => {
        state.driverDetailsFuelStatus = "fail";
        state.driverDetailsFuelMsg = action.payload.message;
      })
      .addCase(getDriverDetailsMaintenance.pending, (state) => {
        state.driverDetailsMaintenanceStatus = "loading";
      })
      .addCase(getDriverDetailsMaintenance.fulfilled, (state, action) => {
        state.driverDetailsMaintenanceStatus = "success";
        // state.loginError = false;
        state.driverDetailsMaintenance = action.payload;
        // console.log(action.payload);
        state.driverDetailsMaintenanceTotal = action.payload.maintenance.total;
      })
      .addCase(getDriverDetailsMaintenance.rejected, (state, action) => {
        state.driverDetailsMaintenanceStatus = "fail";
        state.driverDetailsMaintenanceMsg = action.payload.message;
      })
      .addCase(createDriver.pending, (state) => {
        state.createDriverStatus = "loading";
      })
      .addCase(createDriver.fulfilled, (state, action) => {
        state.createDriverStatus = "success";
        state.createDriverMsg = action.payload.message;
      })
      .addCase(createDriver.rejected, (state, action) => {
        state.createDriverStatus = "fail";
        state.createDriverMsg = action.payload.message;
      })
      .addCase(updateDriver.pending, (state) => {
        state.updateDriverStatus = "loading";
      })
      .addCase(updateDriver.fulfilled, (state, action) => {
        state.updateDriverStatus = "success";
        state.updateDriverMsg = action.payload.message;
      })
      .addCase(updateDriver.rejected, (state, action) => {
        state.updateDriverStatus = "fail";
        state.updateDriverMsg = action.payload.message;
      })
      .addCase(getUserList.pending, (state) => {
        state.userListStatus = "loading";
      })
      .addCase(getUserList.fulfilled, (state, action) => {
        state.userListStatus = "success";
        state.userList = action.payload.data.data;
        state.userListMsg = action.payload.message;
        state.userListTotal = action.payload.data.total;
      })
      .addCase(getUserList.rejected, (state, action) => {
        state.userListStatus = "fail";
        state.userListMsg = action.payload.message;
      })
      .addCase(createUser.pending, (state) => {
        state.createUserStatus = "loading";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.createUserStatus = "success";
        state.createUserMsg = action.payload.message;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.createUserStatus = "fail";
        state.createUserMsg = action.payload.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.updateUserStatus = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateUserStatus = "success";
        state.updateUserMsg = action.payload.message;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateUserStatus = "fail";
        state.updateUserMsg = action.payload.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.deleteUserStatus = "loading";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.deleteUserStatus = "success";
        state.deleteUserMsg = action.payload.message;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.deleteUserStatus = "fail";
        state.deleteUserMsg = action.payload.message;
      });
  },
});

export const {
  resetCreateUserStatus,
  resetDeleteUserStatus,
  signInStart,
  setSelectBoxDrivers,
  resetDriverUpdateStats,
  resetUpdateUserStatus,
} = userSlice.actions;

export const selectUser = (state) => state.user.currentUser;
export const selectLoginLoading = (state) => state.user.loginLoading;
export const selectLoginStatus = (state) => state.user.loginStatus;
export const selectLoginError = (state) => state.user.loginError;
export const selectLoginMsg = (state) => state.user.loginMsg;
export const selectAllDrivers = (state) => state.user.driversFull;
export const selectAllDriversStatus = (state) => state.user.getDriversStatus;
export const selectAllDriversMsg = (state) => state.user.getDriversMsg;
export const selectDriversList = (state) => state.user.driversList;
export const selectDriversListStatus = (state) =>
  state.user.getDriversListStatus;
export const selectDriversListMsg = (state) => state.user.getDriversListMsg;
export const selectTotalDrivers = (state) => state.user.totalDrivers;
export const selectDriverDetails = (state) => state.user.driverDetails;
export const selectDriverDetailsStatus = (state) =>
  state.user.driverDetailsStatus;
export const selectDriverDetailsMsg = (state) => state.user.driverDetailsMsg;
export const selectDriverDetailsHistory = (state) =>
  state.user.driverDetailsHistory;
export const selectDriverDetailsHistoryStatus = (state) =>
  state.user.driverDetailsHistoryStatus;
export const selectDriverDetailsHistoryMsg = (state) =>
  state.user.driverDetailsHistoryMsg;
export const selectDriverDetailsHistoryTotal = (state) =>
  state.user.driverDetailsHistoryTotal;
export const selectDriverDetailsFuel = (state) => state.user.driverDetailsFuel;
export const selectDriverDetailsFuelStatus = (state) =>
  state.user.driverDetailsFuelStatus;
export const selectDriverDetailsFuelMsg = (state) =>
  state.user.driverDetailsFuelMsg;
export const selectDriverDetailsFuelTotal = (state) =>
  state.user.driverDetailsFuelTotal;
export const selectDriverDetailsMaintenance = (state) =>
  state.user.driverDetailsMaintenance;
export const selectDriverDetailsMaintenanceStatus = (state) =>
  state.user.driverDetailsMaintenanceStatus;
export const selectDriverDetailsMaintenanceMsg = (state) =>
  state.user.driverDetailsMaintenanceMsg;
export const selectDriverDetailsMaintenanceTotal = (state) =>
  state.user.driverDetailsMaintenanceTotal;
export const selectCreateDriverStatus = (state) =>
  state.user.createDriverStatus;
export const selectCreateDriverMsg = (state) => state.user.createDriverMsg;
export const selectUpdateDriverStatus = (state) =>
  state.user.updateDriverStatus;
export const selectUpdateDriverMsg = (state) => state.user.updateDriverMsg;
export const selectDriverSelectInputs = (state) => state.user.selectBoxDrivers;
export const selectUserList = (state) => state.user.userList;
export const selectUserListTotal = (state) => state.user.userListTotal;
export const selectUserListStatus = (state) => state.user.userListStatus;
export const selectUserListMsg = (state) => state.user.userListMsg;
export const selectUserCreateStatus = (state) => state.user.createUserStatus;
export const selectUserCreateMsg = (state) => state.user.createUserMsg;
export const selectUserUpdateStatus = (state) => state.user.updateUserStatus;
export const selectUserUpdateMsg = (state) => state.user.updateUserMsg;
export const selectUserDeleteStatus = (state) => state.user.deleteUserStatus;
export const selectUserDeleteMsg = (state) => state.user.deleteUserMsg;
export default userSlice.reducer;
