import React, { useEffect, useState } from "react";
import GridBox from "../../components/Boxes/GridBox";
import ListPageTitle from "../../components/ListPageTitle";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  contentByYearMsgSelector,
  contentByYearPerPageSelector,
  contentByYearSelector,
  contentByYearStatusSelector,
  contentByYearTotalSelector,
  fetchContentByYear,
} from "../../app/MovieSlice/MovieSlice.jsx";
import { selectIsDarkMode } from "../../app/ThemeConfig/themeConfigSlice.jsx";

const Release = () => {
  const dispatch = useDispatch();
  const contentByYear = useSelector(contentByYearSelector);
  const isDarkMode = useSelector(selectIsDarkMode);
  const contentByYearStatus = useSelector(contentByYearStatusSelector);
  const contentByYearTotal = useSelector(contentByYearTotalSelector);
  const contentByYearPerPage = useSelector(contentByYearPerPageSelector);
  const contentByYearMsg = useSelector(contentByYearMsgSelector);

  const { year } = useParams();
  const [total, setTotal] = useState(contentByYearTotal);
  const [pageSize, setPageSize] = useState(contentByYearPerPage);
  const [pagination, setPagination] = useState({
    current: 1,
    // pageSize: contentByYearPerPage,
    // total: contentByYearTotal,
    position: "both",
    align: "center",
    showSizeChanger: false,
    className: "dark",
    onChange: (page) => {
      setPagination((prev) => ({ ...prev, current: page }));
    },
  });
  const routes = [
    {
      path: "/",
      breadcrumbName: "Home",
    },
    {
      path: `/release/${year}`,
      breadcrumbName: year,
    },
  ];
  useEffect(() => {
    dispatch(
      fetchContentByYear({
        api: `/release_year_moives?year=${year}&page=${pagination.current}`,
      })
    );
  }, [year, pagination.current]);
  useEffect(() => {
    if (contentByYearStatus === "success") {
      // setPagination((prev) => ({
      //   ...prev,
      //   total: contentByYearTotal,
      //   pageSize: contentByYearPerPage,
      // }));
      setTotal(contentByYearTotal);
      setPageSize(contentByYearPerPage);
    }
  }, [contentByYearPerPage, contentByYearStatus, contentByYearTotal]);
  return (
    <div className={`${isDarkMode && "text-white"} my-8`}>
      <ListPageTitle routes={routes} title={`Release: ${year}`} />
      <p className={"pl-5 mt-5"}>{contentByYearTotal} Results</p>
      <GridBox
        loading={contentByYearStatus === "loading"}
        items={contentByYear}
        pagination={{ ...pagination, total: total, pageSize: pageSize }}
        cardClassName={"!p-0"}
        grid={{ gutter: 16, xs: 2, sm: 2, md: 3, lg: 5, xl: 6, xxl: 6 }}
      />
    </div>
  );
};

export default Release;
