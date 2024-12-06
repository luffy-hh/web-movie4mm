import React, { useEffect, useRef, useState } from "react";
import Plyr from "plyr-react";
import { Radio, Rate, Tabs, Tag } from "antd";
import { FaExclamationTriangle } from "react-icons/fa";
import { Link, useLocation, useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";
import GridBoxWithRouter from "../../components/Boxes/GridBox";
import CarouselBox from "../../components/Boxes/CarouselBox.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMovieDetails,
  movieDetailsSelector,
  movieDetailsStatusSelector,
  addToFavorite,
  addFavoriteStatusSelector,
  addFavoriteMsgSelector,
  fetchIsFavorite,
  isFavoriteSelector,
  removeFromFavorite,
  removeFavoriteStatusSelector,
  removeFavoriteMsgSelector,
} from "../../app/MovieSlice/MovieSlice.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import dayjs from "dayjs";
import { selectIsDarkMode } from "../../app/ThemeConfig/themeConfigSlice.jsx";

import { selectUser } from "../../app/UserSlice/UserSlice.jsx";
import Notification from "../../components/Notification.jsx";
import { toast } from "react-toastify";
import FavButton from "../../components/Buttons/FavButton.jsx";

const MovieDetails = () => {
  const { id, type } = useParams();
  const playerRef = useRef(null);
  const dispatch = useDispatch();
  const movieDetails = useSelector(movieDetailsSelector);
  const isDarkMode = useSelector(selectIsDarkMode);
  const addToFavoriteStatus = useSelector(addFavoriteStatusSelector);
  const addToFavoriteMessage = useSelector(addFavoriteMsgSelector);
  const removeFromFavoriteStatus = useSelector(removeFavoriteStatusSelector);
  const removeFromFavoriteMessage = useSelector(removeFavoriteMsgSelector);
  const currentUser = useSelector(selectUser);
  const isFavorite = useSelector(isFavoriteSelector);
  const movieDetailsStatus = useSelector(movieDetailsStatusSelector);
  const [videoLink, setVideoLink] = useState("");
  const [is_tvseries, setIs_tvseries] = useState(false);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState({
    qualityArray: [],
    detail: {},
    description: "",
    genreArray: [],
    actorArray: [],
    countryArray: [],
    release: "",
    duration: "",
    quality: "",
    rating: "",
    imdb: "",
    relatedArray: [],
    seriesArray: [],
  });
  // const { title, is_tvseries } = location.state;
  useEffect(() => {
    if (Object.keys(movieDetails).length > 0) {
      setDetails({
        detail: movieDetails?.detail,
        qualityArray: movieDetails?.videos,
        description: movieDetails?.detail?.description,
        genreArray: movieDetails?.genre,
        actorArray: movieDetails?.cast_and_crew,
        countryArray: movieDetails?.country,
        release: movieDetails?.detail?.release,
        duration: movieDetails?.detail?.runtime,
        quality: movieDetails?.detail?.video_quality,
        rating: movieDetails?.detail?.rating || 4,
        imdb: movieDetails?.detail?.imdb_rating,
        relatedArray: is_tvseries
          ? movieDetails.related_tvseries
          : movieDetails?.related_movie,
        seriesArray: movieDetails?.season,
      });
      setTitle(movieDetails?.detail?.title);
      setIs_tvseries(movieDetails?.detail?.is_tvseries === "1");
    }
  }, [is_tvseries, movieDetails]);
  useEffect(() => {
    if (!is_tvseries && movieDetails?.videos?.length > 0) {
      setVideoLink(movieDetails.videos[0]?.file_url);
    }
    if (is_tvseries && movieDetails?.season?.length > 0) {
      setVideoLink(movieDetails.season[0].episodes[0].file_url);
    }
  }, [is_tvseries, movieDetails, id]);

  useEffect(() => {
    dispatch(
      fetchMovieDetails({
        api: `/single_details?type=${type}&id=${id}`,
      }),
    );
  }, [dispatch, id, type]);
  useEffect(() => {
    currentUser &&
      dispatch(
        fetchIsFavorite({
          api: `/verify_favorite_list?user_id=${currentUser?.user_id}&videos_id=${id}`,
        }),
      );
  }, [
    currentUser?.user_id,
    dispatch,
    id,
    addToFavoriteStatus,
    removeFromFavoriteStatus,
  ]);
  useEffect(() => {
    if (addToFavoriteStatus === "success") {
      toast.success("Added to favorite");
    } else if (addToFavoriteStatus === "failed") {
      toast.error(addToFavoriteMessage);
    }
  }, [addToFavoriteStatus, addToFavoriteMessage]);

  useEffect(() => {
    if (removeFromFavoriteStatus === "success") {
      toast.success("Removed from favorite");
    } else if (removeFromFavoriteStatus === "failed") {
      toast.error(removeFromFavoriteMessage);
    }
  }, [removeFromFavoriteStatus, removeFromFavoriteMessage]);

  return (
    <>
      {movieDetailsStatus === "loading" ||
      addToFavoriteStatus === "loading" ||
      removeFromFavoriteStatus === "loading" ? (
        <Loader
          spin={
            movieDetailsStatus === "loading" ||
            addToFavoriteStatus === "loading" ||
            removeFromFavoriteStatus === "loading"
          }
        />
      ) : (
        <div className="w-full mx-auto pt-5">
          <Notification />
          <Plyr
            ref={playerRef}
            source={{
              type: "video",
              sources: [
                {
                  src: videoLink,
                  type: `video/mp4`,
                },
              ],
              poster: details.detail?.poster_url,
            }}
            options={{
              controls: [
                "play-large",
                "play",
                "rewind",
                "fast-forward",
                "progress",
                "current-time",
                "mute",
                "volume",
                "captions",
                "settings",
                "pip",
                "airplay",
                "fullscreen",
              ],
              settings: ["captions", "quality", "speed"],
              i18n: {
                rewind: "rewind",
                fastForward: "forward",
              },
              seekTime: 10,
              quality: {
                default: 1080,
                options: [240, 360, 480, 720, 1080],
              },
              speed: {
                selected: 1,
                options: [0.5, 0.75, 1, 1.25, 1.5, 2],
              },
              tooltips: { controls: true, seek: true },
              keyboard: { focused: true, global: true },
            }}
          />
          {!is_tvseries && (
            <div className="w-full flex items-center justify-between px-4 mx-auto h-[5rem] bg-slate-700 my-2">
              <Radio.Group
                options={details?.qualityArray.map((item) => ({
                  label: item?.label,
                  value: item?.file_url,
                }))}
                value={videoLink}
                onChange={(e) => {
                  // console.log(e);

                  setVideoLink(e.target.value);
                }}
                optionType="button"
                buttonStyle={"solid"}
              />
              {/*<Tag*/}
              {/*  className="text-md !text-yellow-500 py-2 font-semibold cursor-pointer flex items-center gap-1"*/}
              {/*  color="transparent"*/}
              {/*  icon={<FaExclamationTriangle />}*/}
              {/*>*/}
              {/*  Report*/}
              {/*</Tag>*/}
            </div>
          )}
          {is_tvseries && (
            <Tabs
              // centered={true}
              tabBarGutter={5}
              type={"card"}
              className={`${isDarkMode ? "dark" : ""} mt-4 w-full`}
              items={details.seriesArray.map((item) => ({
                label: item.seasons_name,
                key: item.seasons_id,
                children: (
                  <CarouselBox
                    data={item.episodes.map((item) => ({
                      ...item,
                      current: item.file_url === videoLink,
                      poster_url: item.image_url,
                      tv_name: item.episodes_name,
                    }))}
                    slidesToShow={5}
                    slidesToShowSmall={3}
                    slidesToScroll={3}
                    title={""}
                    key={item.seasons_id}
                    clickAble={true}
                    infinite={true}
                    onClick={setVideoLink}
                  />
                ),
              }))}
            />
          )}
          <div className={`${isDarkMode ? "text-white" : ""} mb-4 mt-8`}>
            <div className="flex items-center gap-4">
              <p className="text-xl font-semibold pb-2 border-b-2 border-[#0769b4]">
                {title}
              </p>
              <Tag
                color="#2db7f5"
                className="text-2xl py-2 font-semibold cursor-default"
              >
                Info
              </Tag>
            </div>
          </div>
          <div
            className={`flex gap-4 flex-col sm:flex-row mb-12 ${
              isDarkMode ? "text-white" : ""
            }`}
          >
            <div className="min-w-[20rem] h-auto">
              <img
                src={details.detail.thumbnail_url}
                alt="thumbnail"
                className={"h-[10rem] sm:h-auto"}
              />
            </div>
            <div className="flex flex-col">
              <p className="text-xl font-semibold">{title}</p>
              {currentUser && (
                <div className="flex gap-2 justify-end">
                  {/*<Tag*/}
                  {/*  onClick={() => {*/}
                  {/*    if (isFavorite) {*/}
                  {/*      dispatch(*/}
                  {/*        removeFromFavorite({*/}
                  {/*          api: "/remove_favorite",*/}
                  {/*          reqData: {*/}
                  {/*            user_id: currentUser?.user_id,*/}
                  {/*            videos_id: details.detail.videos_id,*/}
                  {/*          },*/}
                  {/*        }),*/}
                  {/*      );*/}
                  {/*    } else {*/}
                  {/*      dispatch(*/}
                  {/*        addToFavorite({*/}
                  {/*          api: "/add_favorite",*/}
                  {/*          reqData: {*/}
                  {/*            user_id: currentUser?.user_id,*/}
                  {/*            videos_id: details.detail.videos_id,*/}
                  {/*          },*/}
                  {/*        }),*/}
                  {/*      );*/}
                  {/*    }*/}
                  {/*  }}*/}
                  {/*  color="#111827"*/}
                  {/*  icon={<FaHeart />}*/}
                  {/*  className={`text-2xl py-2 font-semibold cursor-pointer hover:text-red-600 ${*/}
                  {/*    isFavorite ? "!text-red-600" : ""*/}
                  {/*  }`}*/}
                  {/*/>*/}
                  <FavButton details={details} currentUser={currentUser} />
                </div>
              )}
              <p className=" leading-8 my-4">{details.description}</p>
              <div className="flex gap-5">
                <div className="flex flex-col w-3/4 gap-2">
                  <p className=" text-left">
                    <span className="inline-block font-bold text-xl mr-2">
                      Genre:
                    </span>
                    {details.genreArray.map((item, index) => (
                      <span key={index}>
                        <Link
                          to={`/genre/${item.genre_id}`}
                          state={{ ...item, type: item.name }}
                          key={index}
                          className=" text-cyan-500"
                        >
                          {item.name}
                        </Link>
                        {index < details.genreArray.length - 1 && (
                          <span>, </span>
                        )}
                      </span>
                    ))}
                  </p>
                  <p className=" text-left text-wrap leading-6">
                    <span className="inline-block font-bold text-xl mr-2">
                      Actor:
                    </span>
                    {details.actorArray.map((item, index) => (
                      <span key={index}>
                        <Link
                          to={`/content-by-star/${item.star_id}`}
                          state={{ ...item }}
                          key={index}
                          className=" text-cyan-500"
                        >
                          {item.name}
                        </Link>
                        {index < details.actorArray.length - 1 && (
                          <span>, </span>
                        )}
                      </span>
                    ))}
                  </p>
                  <p className=" text-left">
                    <span className="inline-block font-bold text-xl mr-2">
                      Country:
                    </span>
                    {details.countryArray.map((item, index) => (
                      <span key={index}>
                        <Link
                          to={`/country/${item.country_id}`}
                          state={{ ...item }}
                          key={index}
                          className=" text-cyan-500"
                        >
                          {item.name}
                        </Link>
                        {index < details.countryArray.length - 1 && (
                          <span>, </span>
                        )}
                      </span>
                    ))}
                  </p>
                  <p className=" text-left">
                    <span className="inline-block font-bold text-xl mr-2">
                      Release:
                    </span>
                    <span>{dayjs(details.release).format("DD-MM-YYYY")}</span>
                  </p>
                </div>
                <div className="flex flex-col gap-2 w-1/4">
                  <p className=" text-left">
                    <span className="inline-block font-bold text-xl mr-2">
                      Duration:
                    </span>
                    <span>{details.duration}</span>
                  </p>
                  <p className=" text-left">
                    <span className="inline-block font-bold text-xl mr-2">
                      Quality:
                    </span>
                    <Tag color="#4338ca">{details.quality}</Tag>
                  </p>
                  <p className=" text-left">
                    <span className="inline-block font-bold text-xl mr-2">
                      Rating:
                    </span>
                    {details.rating}
                  </p>
                  <p className=" text-left">
                    <span className="inline-block font-bold text-xl mr-2">
                      IMDb:
                    </span>
                    {details.imdb}
                  </p>
                  {/*<strong className=" text-center">*/}
                  {/*  Rating({details.rating})*/}
                  {/*</strong>*/}
                  {/*<Rate allowHalf defaultValue={details.rating} />*/}
                </div>
              </div>
            </div>
          </div>
          <GridBoxWithRouter
            title="You May Like"
            seeMore={false}
            items={details.relatedArray}
            grid={{
              gutter: 16,
              xs: 2,
              sm: 2,
              md: 3,
              lg: 4,
              xl: 6,
              xxl: 6,
            }}
            type={is_tvseries ? "tvseries" : "movie"}
          />
        </div>
      )}
    </>
  );
};

export default MovieDetails;
