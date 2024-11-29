import React, { useEffect, useState } from "react";
import Container from "../../components/Container.jsx";
import ListPageTitle from "../../components/ListPageTitle.jsx";
import { useDispatch, useSelector } from "react-redux";
import { selectIsDarkMode } from "../../app/ThemeConfig/themeConfigSlice.jsx";
import GridBox from "../../components/Boxes/GridBox.jsx";
import {
  fetchUserFavorite,
  userFavoriteSelector,
  userFavoriteStatusSelector,
} from "../../app/MovieSlice/MovieSlice.jsx";
import { selectUser } from "../../app/UserSlice/UserSlice.jsx";

const UserFavorite = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(selectIsDarkMode);
  const currentUser = useSelector(selectUser);
  const userFavorite = useSelector(userFavoriteSelector);
  const userFavoriteStatus = useSelector(userFavoriteStatusSelector);
  const [total, setTotal] = useState(60);
  const [pageSize, setPageSize] = useState(30);
  const [pagination, setPagination] = useState({
    current: 1,
    position: "both",
    align: "center",
    showSizeChanger: false,
    className: isDarkMode && "dark",
    onChange: (page) => {
      setPagination((prev) => ({ ...prev, current: page }));
    },
  });
  useEffect(() => {
    dispatch(
      fetchUserFavorite({
        api: `/favorite?user_id=${currentUser.user_id}&page=${pagination.current}`,
      }),
    );
  }, [currentUser.user_id, dispatch, pagination]);
  return (
    <Container className={"my-8"}>
      <ListPageTitle
        routes={[
          {
            path: "/",
            breadcrumbName: "Home",
          },
          {
            path: "/fav-list",
            breadcrumbName: "Favorite List",
          },
        ]}
        title={"Favorite List"}
        titleClass={`${isDarkMode && "text-white"}`}
      />
      <GridBox
        loading={userFavoriteStatus === "loading"}
        items={userFavorite}
        pagination={{ total, pageSize, ...pagination }}
        grid={{ gutter: 16, xs: 2, sm: 2, md: 3, lg: 4, xl: 6, xxl: 6 }}
      />
    </Container>
  );
};
export default UserFavorite;
