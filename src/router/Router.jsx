import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { Suspense, lazy, useState } from "react";
const Genre = lazy(() => import("../pages/Genre/Genre.jsx"));
const Release = lazy(() => import("../pages/Release/Release.jsx"));
const LiveTv = lazy(() => import("../pages/LiveTV/LiveTv.jsx"));
const Movies = lazy(() => import("../pages/Movies/Movies.jsx"));
const Series = lazy(() => import("../pages/Series/Series.jsx"));
import Loader from "../components/Loader/Loader.jsx";
const A_Z = lazy(() => import("../pages/A-Z/A_Z.jsx"));
const LayoutCmp = lazy(() => import("../layout/LayoutCmp.jsx"));
const PrivateRoute = lazy(() => import("./PrivateRoute"));

const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));
const Home = lazy(() => import("../pages"));

const Router = () => {
  // const [isSmallScreen, setIsSmallScreen] = useState(false);
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader spin={true} />}>
        <Routes>
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route element={<PrivateRoute />}> */}
          <Route path="/" element={<LayoutCmp />}>
            <Route index element={<Home />} />
            <Route path="genre/:type" element={<Genre />} />
            <Route path="release/:year" element={<Release />} />
            <Route path="live-tv" element={<LiveTv />} />
            <Route path="movies" element={<Movies />} />
            <Route path="series" element={<Series />} />
            <Route path="a-z" element={<A_Z />} />
          </Route>
          {/* </Route> */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
