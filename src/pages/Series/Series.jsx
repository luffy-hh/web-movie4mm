import React, { useEffect, useState } from "react";
import ListPageTitle from "../../components/ListPageTitle";
import GridBox from "../../components/Boxes/GridBox";
import Container from "../../components/Container";
import Filters from "../../components/Filters/Filters";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSeriesList,
  seriesListSelector,
  seriesListStatusSelector,
  seriesListTotalSelector,
} from "../../app/MovieSlice/MovieSlice.jsx";
import { selectIsDarkMode } from "../../app/ThemeConfig/themeConfigSlice.jsx";

const Series = () => {
  const dispatch = useDispatch();
  const seriesList = useSelector(seriesListSelector);
  const seriesListTotal = useSelector(seriesListTotalSelector);
  const seriesListStatus = useSelector(seriesListStatusSelector);
  const isDarkMode = useSelector(selectIsDarkMode);
  const [searchParams, setSearchParams] = useState({
    page: 1,
    type: "movies",
    sort: "",
    country: "",
    category: "",
    minimum_rating: 0,
    maximum_rating: 10,
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 24,
    total: seriesListTotal,
    position: "both",
    align: "center",
    showSizeChanger: false,
    className: isDarkMode ? "dark" : "",
    onChange: (page) => {
      setPagination((prev) => ({ ...prev, current: page }));
      setSearchParams((prev) => ({ ...prev, page }));
    },
  });
  useEffect(() => {
    dispatch(
      fetchSeriesList({
        api: `/tvseries`,
        reqData: { ...searchParams },
      }),
    );
  }, [dispatch, pagination, searchParams]);
  useEffect(() => {
    setPagination((prev) => ({ ...prev, total: seriesListTotal }));
  }, [seriesListTotal]);
  return (
    <Container className="my-8">
      <ListPageTitle
        routes={[
          {
            path: "/",
            breadcrumbName: "Home",
          },
          {
            path: "/series",
            breadcrumbName: "Series",
          },
        ]}
        title={"WATCH TV SERIES"}
        titleClass={`${isDarkMode ? "text-white" : ""}`}
      />
      <div className="flex gap-2 mt-2">
        <Filters setSearchParams={setSearchParams} />
        <GridBox
          pagination={pagination}
          loading={seriesListStatus === "loading"}
          items={seriesList}
          className={"flex-1"}
          cardClassName={"!p-0"}
          grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 6, xxl: 6 }}
          type={"tvseries"}
        />
      </div>
    </Container>
  );
};

export default Series;
