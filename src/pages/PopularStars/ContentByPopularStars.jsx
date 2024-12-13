import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  contentByStarsPerPageSelector,
  contentByStarsSelector,
  contentByStarsStatusSelector,
  contentByStarsTotalSelector,
  fetchContentByStars,
} from "../../app/MovieSlice/MovieSlice.jsx";
import ListPageTitle from "../../components/ListPageTitle.jsx";
import withRouter from "../../components/HOCs/withRouter.jsx";
import PropTypes from "prop-types";
import GridBox from "../../components/Boxes/GridBox.jsx";
import { selectIsDarkMode } from "../../app/ThemeConfig/themeConfigSlice.jsx";

const ContentByPopularStars = ({ router }) => {
  const dispatch = useDispatch();

  // console.log(router.location);

  const { id } = useParams();
  const contentByStar = useSelector(contentByStarsSelector);
  const contentByStarTotal = useSelector(contentByStarsTotalSelector);
  const contentByStarsPerPage = useSelector(contentByStarsPerPageSelector);
  const contentByStarStatus = useSelector(contentByStarsStatusSelector);
  const isDarkMode = useSelector(selectIsDarkMode);
  const [total, setTotal] = useState(contentByStarTotal);
  const [pageSize, setPageSize] = useState(contentByStarsPerPage);
  const [pagination, setPagination] = useState({
    current: 1,
    // pageSize: contentByStarsPerPage,
    // total: 0,
    position: "both",
    align: "center",
    showSizeChanger: false,
    className: isDarkMode ? "dark" : "",
    onChange: (page) => {
      setPagination((prev) => ({ ...prev, current: page }));
    },
  });
  // console.log(contentByStar);

  useEffect(() => {
    dispatch(
      fetchContentByStars({
        api: `/content_by_star_id?id=${id}&page=${pagination.current}`,
      })
    );
  }, [dispatch, id, pagination]);

  useEffect(() => {
    // setPagination((prev) => ({
    //   ...prev,
    //   total: contentByStarTotal,
    //   pageSize: contentByStarsPerPage,
    // }));
    setTotal(contentByStarTotal);
    setPageSize(contentByStarsPerPage);
  }, [contentByStarTotal, contentByStarsPerPage]);

  return (
    <>
      <ListPageTitle
        routes={[
          { path: "/", breadcrumbName: "Home" },
          {
            path: "/popular-stars",
            breadcrumbName: "Popular Stars",
          },
          {
            path: `/content-by-star/${id}`,
            breadcrumbName: "Content By Star",
          },
        ]}
        title={`Content By Star: ${
          router.location.state?.star_name || router.location.state?.name
        }`}
      />
      <p className={`pl-5 mt-2 ${isDarkMode && "text-white"}`}>
        {contentByStarTotal} Results
      </p>
      <div className={"mt-2"}>
        <GridBox
          pagination={{ ...pagination, total: total, pageSize: pageSize }}
          items={contentByStar}
          loading={contentByStarStatus === "loading"}
          grid={{ gutter: 16, xs: 2, sm: 2, md: 3, lg: 4, xl: 6, xxl: 6 }}
        />
      </div>
    </>
  );
};

ContentByPopularStars.propTypes = {
  router: PropTypes.object,
};
const ContentByPopularStarsWithRouter = withRouter(ContentByPopularStars);
export default ContentByPopularStarsWithRouter;
