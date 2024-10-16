import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice/UserSlice";
import CarSlice from "./CarSlice/CarSlice";
import FuelSlice from "./FuelSlice/FuelSlice";
import DrivingHistorySlice from "./DrivingHistorySlice/DrivingHistorySlice";
import MaintenanceSlice from "./MaintenanceSlice/MaintenanceSlice";
import ReportSlice from "./ReportSlice/ReportSlice";
import DashboardSlice from "./DashboardSlice/DashboardSlice";
import themeConfigSlice from "./ThemeConfig/themeConfigSlice";

export const store = configureStore({
  reducer: {
    user: UserSlice,
    car: CarSlice,
    fuel: FuelSlice,
    drivingWays: DrivingHistorySlice,
    maintenance: MaintenanceSlice,
    report: ReportSlice,
    dashboard: DashboardSlice,
    theme: themeConfigSlice,
  },
});
