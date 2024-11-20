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

const Filters = lazy(() => import("../../components/Filters/Filters.jsx"));

const Movies = () => {
  const dispatch = useDispatch();
  const movieList = useSelector(movieListSelector);
  const movieListStatus = useSelector(movieListStatusSelector);
  const movieListTotal = useSelector(movieListTotalSelector);
  const [searchParams, setSearchParams] = useState({
    page: 1,
    type: "movies",
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 24,
    total: movieListTotal,
    position: "both",
    align: "center",
    showSizeChanger: false,
    onChange: (page) => setPagination((prev) => ({ ...prev, current: page })),
  });

  useEffect(() => {
    dispatch(fetchMovieList({ api: `/movies?page=${pagination.current}` }));
  }, [dispatch, pagination]);
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
      />
      <div className="flex gap-2 mt-2">
        <Suspense fallback={<Loader spin={true} />}>
          <Filters />

          <GridBox
            loading={movieListStatus === "loading"}
            items={movieList}
            className={"flex-1"}
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
