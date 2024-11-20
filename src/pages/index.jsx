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
  const [movie4K, setMovie4K] = useState([]);
  const [currentYear, setCurrentYear] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);
  const [latestTvSeries, setLatestTvSeries] = useState([]);
  const homeStatus = useSelector(getHomeStatus);
  const slider = useSelector(getSlider);
  const liveSport = useSelector(getLiveSport);
  const movieList = useSelector(getMovieList);
  const popularStars = useSelector(getPopularStars);
  const featuredTvChannels = useSelector(getFeaturedTvChannels);
  console.log(popularStars);

  useEffect(() => {
    dispatch(getHomeContent({ api: "/home_content" }));
  }, [dispatch]);

  useEffect(() => {
    if (movieList.length > 0) {
      setMovie4K(movieList.find((item) => item.type === "4k").movies);
      setCurrentYear(
        movieList.find((item) => item.type === "current_year")?.movies,
      );
      setLatestMovies(
        movieList.find((item) => item.type === "latest_movies").movies,
      );
      setLatestTvSeries(
        movieList.find((item) => item.type === "latest_tvseries").movies,
      );
    }
  }, [movieList]);

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
                  isSmallScreen ? "h-[30rem]" : "h-[50rem]"
                } w-full mx-auto mt-8 bg-slate-400/10 rounded-xl overflow-hidden`}
              >
                {Object.keys(slider).length > 0 &&
                  slider.slide.map((item, index) => (
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
                          <p className="text-2xl text-blue-600">{item.title}</p>
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
                  ))}
              </Carousel>
            </ConfigProvider>
          </div>
          <PopularStarsCarousel />
          {liveSport.length > 0 && (
            <CarouselBox
              data={liveSport}
              slidesToShow={5}
              slidesToShowSmall={3}
              slidesToScroll={1}
              title={"Live-Sport"}
              imgClassName={"h-[18rem]"}
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

          <GridBox
            cardClassName={"!p-0"}
            title={"Resolution"}
            type={"movie"}
            titleTag={"4K"}
            items={movie4K}
            seeMorePath={"movies"}
          />

          <GridBox
            cardClassName={"!p-0"}
            title={"Release"}
            titleTag={"2024"}
            type={"movie"}
            items={currentYear}
            seeMorePath={"release/2024"}
          />

          <GridBox
            cardClassName={"!p-0"}
            title={"Latest Movies"}
            titleTag={""}
            type={"movie"}
            items={latestMovies}
            seeMorePath={"movies"}
          />

          <GridBox
            cardClassName={"!p-0"}
            title={"Latest TV Series"}
            titleTag={""}
            type={"tvseries"}
            items={latestTvSeries}
            seeMorePath={"series"}
          />
        </>
      )}
    </>
  );
};

export default Home;
