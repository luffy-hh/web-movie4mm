import React, { useEffect, useState } from "react";

// const Plyr = lazy(() => import("plyr-react"));
// import Hls from "hls.js";
import { Radio } from "antd";
import { FaDotCircle } from "react-icons/fa";
import CarouselBox from "../../components/Boxes/CarouselBox";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTvDetails,
  tvDetailsSelector,
  tvDetailsStatusSelector,
} from "../../app/MovieSlice/MovieSlice.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import LivePlayer from "../../components/Players/LivePlayer.jsx";
import Notification from "../../components/Notification.jsx";
import { toast } from "react-toastify";
import { selectIsDarkMode } from "../../app/ThemeConfig/themeConfigSlice.jsx";

const LiveTvDetail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const nav = useNavigate();
  const isDarkMode = useSelector(selectIsDarkMode);
  const [sourceUrl, setSourceUrl] = useState(location.state?.stream_url);
  const [type, setType] = useState("tv");
  const [options, setOptions] = useState([]);
  const id = location.pathname.split("/").pop();
  // const { id } = useParams();
  // console.log(id);

  const tvDetails = useSelector(tvDetailsSelector);
  const tvDetailsStatus = useSelector(tvDetailsStatusSelector);
  // console.log(tvDetails, location);
  useEffect(() => {
    if (
      Object.keys(tvDetails).length > 0 &&
      tvDetails.additional_media_source
    ) {
      const options = tvDetails.additional_media_source.map((item) => ({
        label: item.label,
        value: item.url,
      }));
      options.unshift({
        label: tvDetails.stream_label,
        value: tvDetails.stream_url,
      });
      setOptions(options);
      setSourceUrl(tvDetails.stream_url);
    }
    if (location.state) {
      setSourceUrl(location.state.stream_url);
    }
    // if (location.state?.type) {
    //   setType(location.state.type);
    // } else {
    //   nav("/");
    // }
  }, [tvDetails, location]);
  useEffect(() => {
    // console.log("worked");
    dispatch(fetchTvDetails({ api: `/single_details?id=${id}&type=tv` }));
  }, [dispatch, id, type]);
  useEffect(() => {
    tvDetailsStatus === "faild" &&
      toast.error("Failed", {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "light",
      });
  }, [tvDetailsStatus]);
  return (
    <>
      {tvDetailsStatus === "loading" ? (
        <Loader spin={true} />
      ) : (
        <div className={`w-full mx-auto ${isDarkMode && "text-white"}`}>
          <Notification />
          <LivePlayer url={sourceUrl} />
          <div className="flex my-4 gap-8">
            <div className="w-[12rem]">
              <img
                src={tvDetails.thumbnail_url}
                alt={tvDetails.tv_name}
                className="w-full h-[8rem]"
              />
            </div>
            <div className="flex-1 flex justify-between">
              <div className="flex flex-col gap-6">
                <p className="text-xl font-semibold">{tvDetails.tv_name}</p>
                <p className="flex items-center gap-4">
                  <FaDotCircle className="text-red-700" /> Watching live on
                  movie4mm
                </p>
              </div>
              <div>
                <Radio.Group
                  options={options}
                  value={sourceUrl}
                  onChange={(e) => setSourceUrl(e.target.value)}
                  optionType={"button"}
                  buttonStyle={"solid"}
                />
                {/*<Tag color="#111827" className=" cursor-pointer p-2">*/}
                {/*  LINE 1*/}
                {/*</Tag>*/}
                {/*<Tag color="#111827" className=" cursor-pointer p-2">*/}
                {/*  LINE 2*/}
                {/*</Tag>*/}
              </div>
            </div>
          </div>
          <CarouselBox
            title="All TV Channels"
            slidesToScroll={1}
            slidesToShow={6}
            slidesToShowSmall={3}
            data={tvDetails.releated_tv_channel}
            imgClassName={"h-[10rem]"}
            type={type}
          />
        </div>
      )}
    </>
  );
};

export default LiveTvDetail;
