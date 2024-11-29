import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { Suspense, lazy, useState } from "react";
import Genre from "../pages/Genre/Genre.jsx";
import Release from "../pages/Release/Release.jsx";
import LiveTv from "../pages/LiveTV/LiveTv.jsx";
import Movies from "../pages/Movies/Movies.jsx";
import Series from "../pages/Series/Series.jsx";
import Loader from "../components/Loader/Loader.jsx";
import A_Z from "../pages/A-Z/A_Z.jsx";
import LayoutCmp from "../layout/LayoutCmp.jsx";
import MovieDetails from "../pages/Movies/MovieDetails.jsx";
import PrivateRoute from "./PrivateRoute";
import LiveTvDetail from "../pages/LiveTV/LiveTvDetail.jsx";
import LiveTvCategory from "../pages/LiveTV/LiveTvCategory.jsx";

const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));
import Home from "../pages";
import Login from "../pages/Login.jsx";
import PopularStars from "../pages/PopularStars/PopularStars.jsx";
import Search from "../pages/Search/Search.jsx";
import ContentByPopularStars from "../pages/PopularStars/ContentByPopularStars.jsx";
import Country from "../pages/Country/Country.jsx";
import ReleaseList from "../pages/Release/ReleaseList.jsx";

const Router = () => {
  // const [isSmallScreen, setIsSmallScreen] = useState(false);
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader spin={true} />}>
        <Routes>
          {/* <Route path="/login" element={<Login />} /> */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<LayoutCmp />}>
              <Route index element={<Home />} />
              <Route path="genre/:id" element={<Genre />} />
              <Route path="release" element={<ReleaseList />} />
              <Route path="release/:year" element={<Release />} />
              <Route path="movies" element={<Movies />} />
              {/*<Route element={<PrivateRoute />}> */}
              <Route path="watch/:type/:id" element={<MovieDetails />} />
              {/* </Route> */}
              <Route path="series" element={<Series />} />
              <Route path="a-z" element={<A_Z />} />
              <Route path="live-tv" element={<LiveTv />} />
              <Route path="live-tv/:id" element={<LiveTvCategory />} />
              <Route path="watch-live/:id" element={<LiveTvDetail />} />
              <Route path={"popular-stars"} element={<PopularStars />} />
              <Route
                path={"content-by-star/:id"}
                element={<ContentByPopularStars />}
              />
              <Route path={"country/:id"} element={<Country />} />
              <Route path={"search"} element={<Search />} />
            </Route>
          </Route>
          <Route path={"/login"} element={<Login />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
