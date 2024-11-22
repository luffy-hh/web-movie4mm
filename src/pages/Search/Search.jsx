import React, { useEffect, useState } from "react";
import withRouter from "../../components/HOCs/withRouter.jsx";
import PropTypes from "prop-types";
import ListPageTitle from "../../components/ListPageTitle.jsx";
import GridBox from "../../components/Boxes/GridBox.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSearchAll,
  selectAllSearchResults,
  selectAllSearchResultsStatus,
} from "../../app/HomeSlice/HomeSlice.jsx";

const Search = ({ router }) => {
  const dispatch = useDispatch();
  const searchResult = useSelector(selectAllSearchResults);
  const searchResultStatus = useSelector(selectAllSearchResultsStatus);
  const [allResults, setAllResults] = useState([]);
  const { keyword } = router.location.state;
  useEffect(() => {
    dispatch(fetchSearchAll({ api: `/search?keyword=${keyword}` }));
  }, [keyword]);
  useEffect(() => {
    if (Object.keys(searchResult).length > 0) {
      setAllResults([
        // ...searchResult.data[0].list,
        ...searchResult.movie[1].list,
        ...searchResult.movie[2].list,
      ]);
    }
  }, [searchResult]);
  // console.log(router.location);

  return (
    <>
      <ListPageTitle routes={[]} title={`Search Result: ${keyword}`} />
      <GridBox
        items={allResults}
        loading={searchResultStatus === "loading"}
        grid={{ gutter: 16, xs: 2, sm: 2, md: 3, lg: 5, xl: 6, xxl: 6 }}
      />
    </>
  );
};

Search.propTypes = {
  router: PropTypes.object,
};

const SearchWithRouter = withRouter(Search);
export default SearchWithRouter;
