import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { Suspense, lazy, useState } from "react";
const LayoutCmp = lazy(() => import("../layout/LayoutCmp.jsx"));
const PrivateRoute = lazy(() => import("./PrivateRoute"));
const Loader = lazy(() => import("../components/Loader/Loader"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));
const Home = lazy(() => import("../pages"));

const Router = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader spin={true} fullscreen={true} />}>
        <Routes>
          {/* <Route path="/login" element={<Login />} /> */}
          <Route element={<PrivateRoute />}>
            <Route
              path="/"
              element={
                <LayoutCmp
                  setIsSmallScreen={setIsSmallScreen}
                  isSmallScreen={isSmallScreen}
                />
              }
            >
              <Route index element={<Home isSmallScreen={isSmallScreen} />} />
              {/* <Route index element={<Dashboard />} />
                <Route path="cars" element={<Car />} />
                <Route path="cars/create" element={<CarCreate />} />
                <Route path="cars/:id" element={<CarDetail />}>
                  <Route index element={<CarInfo />} />
                  <Route path="history" element={<CarHistory />} />
                  <Route path="fuel" element={<CarFuel />} />
                  <Route path="maintenance" element={<CarMaintenance />} />
                </Route>
                <Route path="cars/:id/edit" element={<CarUpdate />} />
                <Route path="drivers" element={<Drivers />} />
                <Route path="drivers/create" element={<DriverCreate />} />
                <Route path="drivers/:id" element={<DriverDetail />}>
                  <Route index element={<DriverInfo />} />
                  <Route path="history" element={<DriverHistory />} />
                  <Route path="fuel" element={<DriverFuel />} />
                  <Route path="maintenance" element={<DriverMaintenance />} />
                </Route>
                <Route path="drivers/:id/edit" element={<DriverUpdate />} />
                <Route path="driving-history" element={<DrivingHistory />} />
                <Route path="driving-history/create" element={<DrivingWayCreate />} />
                <Route path="driving-history/:id" element={<DrivingWaysDetail />} />
                <Route path="driving-history/:id/edit" element={<DrivingWaysEdit />} />
                <Route path="reports" element={<Report />} />
                <Route path="fuel" element={<Fuel />} />
                <Route path="fuel-report" element={<FuelReport />} />
                <Route path="fuel-report-daily" element={<FuelReportDaily />} />
                <Route path="fuel/create" element={<FuelCreate />} />
                <Route path="fuel/:id" element={<FuelDetail />} />
                <Route path="fuel/:id/edit" element={<FuelDetailEdit />} />
                <Route path="maintenance" element={<Maintenance />} />
                <Route path="maintenance/create" element={<MaintenanceCreate />} />
                <Route path="maintenance/:id" element={<MaintenanceDetail />} />
                <Route path="maintenance/:id/edit" element={<MaintenanceEdit />} />
                <Route path="user-management" element={<UserManagement />} />
                <Route path="user-management/create" element={<UserCreate />} />
                <Route path="user-management/:id/edit" element={<UserEdit />} /> */}
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
