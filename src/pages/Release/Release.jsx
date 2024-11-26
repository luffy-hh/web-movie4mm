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

const Release = () => {
  const dispatch = useDispatch();
  const contentByYear = useSelector(contentByYearSelector);
  const contentByYearStatus = useSelector(contentByYearStatusSelector);
  const contentByYearTotal = useSelector(contentByYearTotalSelector);
  const contentByYearPerPage = useSelector(contentByYearPerPageSelector);
  const contentByYearMsg = useSelector(contentByYearMsgSelector);
  console.log(contentByYearTotal, contentByYear.length);

  const { year } = useParams();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: contentByYearPerPage,
    total: contentByYearTotal,
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
      }),
    );
  }, [year, pagination.current]);
  useEffect(() => {
    if (contentByYearStatus === "success") {
      setPagination((prev) => ({
        ...prev,
        total: contentByYearTotal,
        pageSize: contentByYearPerPage,
      }));
    }
  }, [contentByYearPerPage, contentByYearStatus, contentByYearTotal]);
  return (
    <div className="my-8">
      <ListPageTitle routes={routes} title={`Release: ${year}`} />
      <GridBox
        loading={contentByYearStatus === "loading"}
        items={contentByYear}
        pagination={pagination}
        cardClassName={"!p-0"}
        grid={{ gutter: 16, xs: 2, sm: 2, md: 3, lg: 5, xl: 6, xxl: 6 }}
      />
    </div>
  );
};

export default Release;
