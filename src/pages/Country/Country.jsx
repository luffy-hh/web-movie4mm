import React, { useEffect, useState } from "react";
import ListPageTitle from "../../components/ListPageTitle.jsx";
import { useParams } from "react-router-dom";
import withRouter from "../../components/HOCs/withRouter.jsx";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import GridBox from "../../components/Boxes/GridBox.jsx";
import {
  contentByCountryPerPageSelector,
  contentByCountrySelector,
  contentByCountryStatusSelector,
  contentByCountryTotalSelector,
  fetchContentByCountry,
} from "../../app/MovieSlice/MovieSlice.jsx";
import { selectIsDarkMode } from "../../app/ThemeConfig/themeConfigSlice.jsx";

const Country = ({ router }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { name } = router.location.state;
  const contentByCountry = useSelector(contentByCountrySelector);
  const isDarkMode = useSelector(selectIsDarkMode);
  const contentByCountryTotal = useSelector(contentByCountryTotalSelector);
  const contentByCountryPerPage = useSelector(contentByCountryPerPageSelector);
  const contentByCountryStatus = useSelector(contentByCountryStatusSelector);
  const [total, setTotal] = useState(contentByCountryTotal);
  const [pageSize, setPageSize] = useState(contentByCountryPerPage);
  const [pagination, setPagination] = useState({
    current: 1,
    position: "both",
    align: "center",
    showSizeChanger: false,
    className: isDarkMode ? "dark" : "",
    onChange: (page) => {
      setPagination((prev) => ({ ...prev, current: page }));
    },
  });
  useEffect(() => {
    dispatch(
      fetchContentByCountry({
        api: `/content_by_country_id?id=${id}&page=${pagination.current}`,
      })
    );
  }, [id, pagination]);
  useEffect(() => {
    // setPagination((prev) => ({
    //   ...prev,
    //   total: contentByCountryTotal,
    //   pageSize: contentByCountryPerPage,
    // }));
    setTotal(contentByCountryTotal);
    setPageSize(contentByCountryPerPage);
  }, [contentByCountryPerPage, contentByCountryTotal]);
  return (
    <div className={`my-2 ${isDarkMode && "text-white"}`}>
      <ListPageTitle
        title={`Content By Country: ${name}`}
        routes={[
          {
            path: "/",
            breadcrumbName: "Home",
          },
          {
            path: `/country/${id}`,
            breadcrumbName: name,
          },
        ]}
      />
      <p className={"pl-5 my-4"}>{contentByCountryTotal} Results</p>
      <GridBox
        loading={contentByCountryStatus === "loading"}
        items={contentByCountry}
        pagination={{ ...pagination, total: total, pageSize: pageSize }}
        grid={{ gutter: 16, xs: 2, sm: 2, md: 3, lg: 5, xl: 6, xxl: 6 }}
      />
    </div>
  );
};

Country.propTypes = {
  router: PropTypes.object,
};

const CountryWithRouter = withRouter(Country);
export default CountryWithRouter;
