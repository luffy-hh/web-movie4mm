import React, { useEffect, useState } from "react";
import withRouter from "../../components/HOCs/withRouter.jsx";
import PropTypes from "prop-types";
import ListPageTitle from "../../components/ListPageTitle.jsx";
import GridBox from "../../components/Boxes/GridBox.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSearchAll,
  selectAllSearchResults,
  selectAllSearchResultsPerPage,
  selectAllSearchResultsStatus,
  selectAllSearchResultsTotal,
} from "../../app/HomeSlice/HomeSlice.jsx";
import { selectIsDarkMode } from "../../app/ThemeConfig/themeConfigSlice.jsx";

const Search = ({ router }) => {
  const dispatch = useDispatch();
  const searchResult = useSelector(selectAllSearchResults);
  const isDarkMode = useSelector(selectIsDarkMode);
  const searchResultTotal = useSelector(selectAllSearchResultsTotal);
  const searchResultPerPage = useSelector(selectAllSearchResultsPerPage);
  const searchResultStatus = useSelector(selectAllSearchResultsStatus);
  const [allResults, setAllResults] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 30,
    total: 0,
    position: "both",
    align: "center",
    showSizeChanger: false,
    className: "dark",
    onChange: (page) => {
      setPagination((prev) => ({ ...prev, current: page }));
    },
  });
  const { keyword } = router.location.state;
  useEffect(() => {
    dispatch(
      fetchSearchAll({
        api: `/search?keyword=${keyword}&page=${pagination.current}`,
      }),
    );
  }, [keyword, pagination]);
  useEffect(() => {
    if (Object.keys(searchResult).length > 0) {
      setAllResults([
        // ...searchResult.data[0].list,
        ...searchResult.movie,
      ]);
    }
  }, [searchResult]);
  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      total: searchResultTotal,
      pageSize: searchResultPerPage,
    }));
  }, [searchResultTotal, searchResultPerPage]);
  // console.log(router.location);

  return (
    <div className={"mt-4"}>
      <ListPageTitle routes={[]} title={`Search Result: ${keyword}`} />
      <p className={`pl-5 mt-2 ${isDarkMode && "text-white"}`}>
        {searchResultTotal} Results
      </p>
      <GridBox
        pagination={pagination}
        items={allResults}
        loading={searchResultStatus === "loading"}
        grid={{ gutter: 16, xs: 2, sm: 2, md: 3, lg: 5, xl: 6, xxl: 6 }}
      />
    </div>
  );
};

Search.propTypes = {
  router: PropTypes.object,
};

const SearchWithRouter = withRouter(Search);
export default SearchWithRouter;
