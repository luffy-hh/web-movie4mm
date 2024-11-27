import { Button, Carousel, ConfigProvider, Tag } from "antd";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CarouselBox from "../components/Boxes/CarouselBox";
import GridBox from "../components/Boxes/GridBox";
import { useDispatch, useSelector } from "react-redux";
import {
  getFeaturedTvChannels,
  getHomeContent,
  getHomeStatus,
  getLiveSport,
  getMovieList,
  getPopularStars,
  getSlider,
} from "../app/HomeSlice/HomeSlice";
import Loader from "../components/Loader/Loader.jsx";
import { Link } from "react-router-dom";
import { addExtraClassNames } from "../utilities/UtilFunctions.jsx";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";
import PopularStarsCarousel from "../components/PopularStarsCarousel.jsx";

const Home = () => {
  const dispatch = useDispatch();
  const isSmallScreen = useSelector((state) => state.theme.isSmallScreen);
  const homeStatus = useSelector(getHomeStatus);
  const slider = useSelector(getSlider);
  const liveSport = useSelector(getLiveSport);
  const movieList = useSelector(getMovieList);

  const popularStars = useSelector(getPopularStars);
  const featuredTvChannels = useSelector(getFeaturedTvChannels);

  // useEffect(() => {
  //   dispatch(getHomeContent({ api: "/home_content" }));
  // }, [dispatch]);

  return (
    <>
      {homeStatus === "loading" ? (
        <Loader spin={homeStatus === "loading"} />
      ) : (
        <>
          <div className="top-carousel">
            <ConfigProvider
              theme={{
                components: {
                  Carousel: {
                    arrowSize: 32,
                  },
                },
              }}
            >
              <Carousel
                draggable={true}
                arrows
                autoplay
                infinite
                adaptiveHeight={true}
                arrowSize={20}
                className={`${
                  isSmallScreen ? "h-[30rem]" : "h-[40rem]"
                } w-full mx-auto mt-8 bg-slate-400/10 rounded-xl overflow-hidden`}
              >
                {Object.keys(slider).length > 0 &&
                  slider.slide.map((item, index) =>
                    slider.slider_type === "image" ? (
                      <div className={"h-full"} key={index}>
                        <div
                          style={{ backgroundImage: `url(${item.image_link})` }}
                          className={`h-[50rem] bg-no-repeat bg-[length:100%_100%] bg-center group relative`}
                        ></div>
                      </div>
                    ) : (
                      <Link
                        to={`watch/${item.action_type}/${item.id}`}
                        state={{ ...item }}
                        key={index}
                        className={"h-full"}
                      >
                        <div
                          style={{ backgroundImage: `url(${item.image_link})` }}
                          className={`h-[50rem] bg-no-repeat bg-[length:100%_100%] bg-center group relative`}
                        >
                          <div className="p-4 w-[20rem] bg-slate-700/40 h-full text-white absolute left-0 transform translate-x-[-20rem] opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                            <p className="text-2xl text-blue-600">
                              {item.title}
                            </p>
                            <div className="p-2 border bg-slate-900/80">
                              <div>
                                <strong>Release:</strong> 2019
                              </div>
                              <div>
                                <strong>IMDB:</strong> 8
                              </div>
                            </div>
                            <Button type="primary" className="mt-2">
                              Watch Now
                            </Button>
                          </div>
                        </div>
                      </Link>
                    )
                  )}
              </Carousel>
            </ConfigProvider>
          </div>
          <PopularStarsCarousel />
          {liveSport.length > 0 && (
            <CarouselBox
              data={liveSport}
              slidesToShow={3}
              slidesToShowSmall={2}
              slidesToScroll={1}
              title={"Live-Sport"}
              imgClassName={"h-[18rem]"}
              type={"tv"}
            />
          )}
          <CarouselBox
            data={featuredTvChannels}
            slidesToShow={5}
            slidesToShowSmall={3}
            slidesToScroll={1}
            title={"Featured TV Channels"}
            imgClassName={"h-[10rem]"}
            type={"tv"}
          />
          {movieList.map((item, index) => (
            <GridBox
              key={index}
              cardClassName={"!p-0"}
              title={item.title}
              // titleTag={item.type}
              type={item.type === "latest_tvseries" ? "tvseries" : "movie"}
              items={item.movies}
              seeMorePath={
                item.type === "latest_tvseries" ? "series" : "movies"
              }
            />
          ))}
        </>
      )}
    </>
  );
};

export default Home;
