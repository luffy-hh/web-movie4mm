import React from "react";
import {
  addToFavorite,
  isFavoriteSelector,
  removeFromFavorite,
} from "../../app/MovieSlice/MovieSlice.jsx";
import { FaHeart } from "react-icons/fa6";
import { Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

const FavButton = ({ currentUser, details }) => {
  const dispatch = useDispatch();
  const isFavorite = useSelector(isFavoriteSelector);

  return (
    <Tag
      onClick={() => {
        if (isFavorite) {
          dispatch(
            removeFromFavorite({
              api: "/remove_favorite",
              reqData: {
                user_id: currentUser?.user_id,
                videos_id: details.detail.videos_id,
              },
            }),
          );
        } else {
          dispatch(
            addToFavorite({
              api: "/add_favorite",
              reqData: {
                user_id: currentUser?.user_id,
                videos_id: details.detail.videos_id,
              },
            }),
          );
        }
      }}
      color="#111827"
      icon={<FaHeart />}
      className={`text-2xl py-2 font-semibold cursor-pointer hover:text-red-600 ${
        isFavorite ? "!text-red-600" : ""
      }`}
    />
  );
};
FavButton.propTypes = {
  currentUser: PropTypes.object,
  details: PropTypes.object,
};
export default FavButton;
