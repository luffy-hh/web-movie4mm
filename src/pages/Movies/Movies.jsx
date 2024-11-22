import React, { lazy, Suspense, useEffect, useState } from "react";
import ListPageTitle from "../../components/ListPageTitle";

const GridBox = lazy(() => import("../../components/Boxes/GridBox"));
import Container from "../../components/Container";
import Loader from "../../components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMovieList,
  movieListSelector,
  movieListStatusSelector,
  movieListTotalSelector,
} from "../../app/MovieSlice/MovieSlice.jsx";
import {
  selectIsDarkMode,
  selectIsMediumScreen,
} from "../../app/ThemeConfig/themeConfigSlice.jsx";
import { FaFilter, FaX } from "react-icons/fa6";
import { Drawer } from "antd";

const Filters = lazy(() => import("../../components/Filters/Filters.jsx"));

const Movies = () => {
  const dispatch = useDispatch();
  const movieList = useSelector(movieListSelector);
  const movieListStatus = useSelector(movieListStatusSelector);
  const movieListTotal = useSelector(movieListTotalSelector);
  const isDarkMode = useSelector(selectIsDarkMode);
  const isMediumScreen = useSelector(selectIsMediumScreen);
  const [searchParams, setSearchParams] = useState({
    page: 1,
    sort: "",
    category: "",
    country: "",
    minimum_rating: 0,
    maximum_rating: 10,
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 24,
    total: movieListTotal,
    position: "both",
    align: "center",
    showSizeChanger: false,
    className: isDarkMode ? "dark" : "",
    onChange: (page) => {
      setPagination((prev) => ({ ...prev, current: page }));
      setSearchParams((prev) => ({ ...prev, page }));
    },
  });
  const [openFilter, setOpenFilter] = useState(false);

  useEffect(() => {
    dispatch(
      fetchMovieList({
        api: `/movies`,
        reqData: { ...searchParams },
      }),
    );
  }, [dispatch, pagination, searchParams]);
  useEffect(() => {
    setPagination((prev) => ({ ...prev, total: movieListTotal }));
  }, [movieListTotal]);

  return (
    <Container className="my-8">
      <ListPageTitle
        routes={[
          {
            path: "/",
            breadcrumbName: "Home",
          },
          {
            path: "/movies",
            breadcrumbName: "Movies",
          },
        ]}
        title={"WATCH MOVIES"}
        titleClass={`${isDarkMode ? "text-white" : ""}`}
      />
      {isMediumScreen && (
        <div
          className={`${
            isDarkMode ? "text-white" : ""
          } flex justify-end cursor-pointer text-2xl`}
          onClick={() => setOpenFilter(true)}
        >
          <FaFilter />
        </div>
      )}
      <Drawer
        placement="top"
        open={openFilter}
        onClose={() => setOpenFilter(false)}
        key="top"
        closeIcon={
          <div style={{ color: isDarkMode ? "white" : "black" }}>
            <FaX />
          </div>
        }
        styles={{
          header: {
            padding: "4px 10px",
            background: isDarkMode ? "#001529" : "#fff",
          },
          body: {
            padding: 0,
            background: isDarkMode ? "#001529" : "#fff",
          },
        }}
      >
        <Filters setSearchParams={setSearchParams} />
      </Drawer>
      <div className="flex gap-2 mt-2">
        <Suspense fallback={<Loader spin={true} />}>
          {!isMediumScreen && <Filters setSearchParams={setSearchParams} />}
          <GridBox
            loading={movieListStatus === "loading"}
            items={movieList}
            className={"flex-1 "}
            cardClassName={"!p-0"}
            grid={{ gutter: 16, xs: 2, sm: 2, md: 3, lg: 4, xl: 6, xxl: 6 }}
            pagination={pagination}
            type={"movie"}
          />
        </Suspense>
      </div>
    </Container>
  );
};

export default Movies;
