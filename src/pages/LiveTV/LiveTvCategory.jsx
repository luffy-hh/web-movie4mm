import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import CarouselBox from "../../components/Boxes/CarouselBox";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChannelByEachCategory,
  selectChannelByEachCategory,
} from "../../app/TvChannelSlice/TvChannelSlice.jsx";

const LiveTvCategory = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const channelList = useSelector(selectChannelByEachCategory);

  const { id } = useParams();
  const { type } = location.state;
  useEffect(() => {
    dispatch(
      fetchChannelByEachCategory({
        api: `/tv_channel_by_category_id?live_tv_category_id=${id}`,
      }),
    );
  }, [id]);
  //   console.log(name);
  return (
    <div className="w-full h-full mx-auto">
      <CarouselBox
        data={channelList}
        slidesToShow={5}
        title={`${type
          .replace(/_/g, " ")
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}`}
        imgClassName={"h-[10rem]"}
        slidesToScroll={1}
      />
    </div>
  );
};

export default LiveTvCategory;
