import React, { useRef } from "react";
import { Button, Carousel } from "antd";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getPopularStars } from "../app/HomeSlice/HomeSlice.jsx";
import { FaAngleDoubleRight } from "react-icons/fa";
import { selectIsDarkMode } from "../app/ThemeConfig/themeConfigSlice.jsx";

const PopularStarsCarousel = () => {
  const isDarkMode = useSelector(selectIsDarkMode);
  const carouselRef = useRef(null);
  const popularStars = useSelector(getPopularStars);
  const isSmallScreen = useSelector((state) => state.theme.isSmallScreen);
  const next = () => {
    carouselRef.current.next();
    // console.log(carouselRef.current);
  };

  const prev = () => {
    carouselRef.current.prev();
  };
  return (
    <div className={"mt-8"}>
      <div className="flex items-center justify-between mb-4">
        <p
          className={`text-xl font-semibold pb-2 border-b-2 border-[#0769b4] ${
            isDarkMode && "text-white"
          }`}
        >
          Popular Stars
        </p>
        <div className="flex gap-2">
          <Link
            to={"popular-stars"}
            className={`${
              isDarkMode && "text-white"
            } flex items-center gap-2 font-semibold hover:cursor-pointer hover:underline hover:underline-offset-4`}
          >
            See All <FaAngleDoubleRight />
          </Link>
          {/*<Button onClick={prev}>*/}
          {/*  <FaCaretLeft />*/}
          {/*</Button>*/}
          {/*<Button onClick={next}>*/}
          {/*  <FaCaretRight />*/}
          {/*</Button>*/}
        </div>
      </div>
      <Carousel
        dots={false}
        draggable={true}
        slidesToShow={isSmallScreen ? 5 : 10}
        slidesToScroll={isSmallScreen ? 2 : 5}
        autoplay={false}
        arrows={false}
        className={"my-4"}
        infinite={true}
        ref={carouselRef}
      >
        {popularStars.map((star, i) => (
          <div
            className={`${
              isDarkMode ? "text-white" : "text-blue-700"
            } hover:text-slate-500 px-2 mr-2`}
            key={i}
          >
            <div className="h-[100%] bg-no-repeat bg-[length:100%_100%] bg-center">
              <img
                src={star.image_url}
                alt="photo"
                className={"w-full rounded-xl"}
              />
            </div>
            <Link to={`/content-by-star/${star.star_id}`} state={{ ...star }}>
              <p className="text-center mt-4 text-xl">{star.star_name}</p>
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  );
};
export default PopularStarsCarousel;
