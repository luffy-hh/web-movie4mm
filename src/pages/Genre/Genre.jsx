import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import GridBox from "../../components/Boxes/GridBox";
import ListPageTitle from "../../components/ListPageTitle";
import { useDispatch, useSelector } from "react-redux";
import { selectIsDarkMode } from "../../app/ThemeConfig/themeConfigSlice.jsx";
import {
  fetchByGenreId,
  listByGenrePerPageSelector,
  listByGenreSelector,
  listByGenreStatusSelector,
  listByGenreTotalSelector,
} from "../../app/MovieSlice/MovieSlice.jsx";

const Genre = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isDarkMode = useSelector(selectIsDarkMode);
  const listByGenreId = useSelector(listByGenreSelector);
  const listByGenreStatus = useSelector(listByGenreStatusSelector);
  const listByGenreTotal = useSelector(listByGenreTotalSelector);
  const location = useLocation();
  const listByGenrePerPage = useSelector(listByGenrePerPageSelector);
  const { type } = location.state;

  const routes = [
    {
      path: "/",
      breadcrumbName: "Home",
    },
    {
      path: `/genre/${id}`,
      breadcrumbName: type.toUpperCase(),
    },
  ];
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: listByGenrePerPage,
    total: listByGenreTotal,
    position: "both",
    align: "center",
    showSizeChanger: false,
    className: isDarkMode ? "dark" : "",
    onChange: (page) => {
      setPagination((prev) => ({ ...prev, current: page }));
    },
  });
  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      total: listByGenreTotal,
      pageSize: listByGenrePerPage,
    }));
  }, [listByGenrePerPage, listByGenreTotal]);
  useEffect(() => {
    dispatch(
      fetchByGenreId({
        api: `/content_by_genre_id?id=${id}&page=${pagination.current}`,
      }),
    );
  }, [pagination, dispatch, id]);

  //   console.log(type);
  return (
    <div className={`my-8 ${isDarkMode && "text-white"}`}>
      <ListPageTitle routes={routes} title={`GENRE: ${type?.toUpperCase()}`} />
      <p className={"mt-5 pl-5"}>{listByGenreTotal} Results</p>
      <GridBox
        loading={listByGenreStatus === "loading"}
        items={listByGenreId}
        pagination={pagination}
        cardClassName={"!p-0"}
        grid={{ gutter: 16, xs: 2, sm: 2, md: 3, lg: 5, xl: 6, xxl: 6 }}
      />
    </div>
  );
};

export default Genre;
