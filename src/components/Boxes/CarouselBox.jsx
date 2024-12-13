import { Button, Carousel } from "antd";
import { useEffect, useRef } from "react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";
import PropTypes from "prop-types";
import { addExtraClassNames } from "../../utilities/UtilFunctions";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsDarkMode } from "../../app/ThemeConfig/themeConfigSlice.jsx";
import withRouter from "../HOCs/withRouter.jsx";
import { selectUser } from "../../app/UserSlice/UserSlice.jsx";

const CarouselBox = ({
  slidesToScroll = 1,
  slidesToShow = 1,
  slidesToShowSmall = 3,
  title,
  type = "tv",
  wrapperClassName,
  carouselClassName,
  imgClassName,
  data = [],
  clickAble = false,
  onClick = () => {},
  infinite = true,
  router,
}) => {
  const isDarkMode = useSelector(selectIsDarkMode);
  const isSmallScreen = useSelector((state) => state.theme.isSmallScreen);
  const carouselRef = useRef();
  const { nav } = router;
  const currentUser = useSelector(selectUser);
  const next = () => {
    carouselRef.current.next();
    // console.log(carouselRef.current);
  };

  const prev = () => {
    carouselRef.current.prev();
  };

  return (
    <div
      className={addExtraClassNames("w-full mx-auto my-16 ", wrapperClassName)}
    >
      <div className="flex items-center justify-between mb-4">
        <p
          className={`${
            isDarkMode && "text-white"
          } text-xl font-semibold pb-2 border-b-2 border-[#0769b4]`}
        >
          {title}
        </p>
        <div className="flex gap-2">
          <Button
            onClick={() => {
              if (isSmallScreen && data.length > slidesToShowSmall) {
                prev();
              }
              if (!isSmallScreen && data.length > slidesToShow) {
                prev();
              }
            }}
          >
            <FaCaretLeft />
          </Button>
          <Button
            onClick={() => {
              if (isSmallScreen && data.length > slidesToShowSmall) {
                next();
              }
              if (!isSmallScreen && data.length > slidesToShow) {
                next();
              }
            }}
          >
            <FaCaretRight />
          </Button>
        </div>
      </div>
      <Carousel
        dots={false}
        draggable={true}
        ref={carouselRef}
        slidesToShow={isSmallScreen ? slidesToShowSmall : slidesToShow}
        slidesToScroll={slidesToScroll}
        autoplay={false}
        arrows={false}
        className={addExtraClassNames(" max-h-[20rem]", carouselClassName)}
        infinite={infinite}
      >
        {data.map((item, i) => {
          if (clickAble) {
            return (
              <div
                className="bg-gray-500 hover:text-slate-200 relative shadow-lg cursor-pointer p-2 mr-5"
                key={i}
                onClick={() => onClick(item.file_url)}
              >
                {item?.current && (
                  <p
                    className={
                      "absolute top-2 left-2 p-2 bg-yellow-200 text-black font-xl font-bold"
                    }
                  >
                    Playing...
                  </p>
                )}
                <div className="h-[100%] bg-no-repeat bg-[length:100%_100%] bg-center">
                  <img
                    src={item.poster_url}
                    alt="photo"
                    className={addExtraClassNames("w-full", imgClassName)}
                  />
                </div>
                <p className=" text-center mt-4 text-xl">{item.tv_name}</p>
              </div>
            );
          } else {
            return (
              <div
                onClick={() => {
                  // if (currentUser) {
                  nav(`/watch-live/${item.live_tv_id}`, {
                    state: { ...item, type: type },
                  });
                  // } else {
                  //   nav("/login");
                  // }
                }}
                className="px-6 mr-5 cursor-pointer"
                key={i}
              >
                <div
                  className={`${
                    isDarkMode ? "text-white" : "text-blue-700"
                  } hover:text-slate-500 `}
                >
                  <div className="h-[100%] bg-no-repeat bg-[length:100%_100%] bg-center">
                    <img
                      src={item.poster_url}
                      alt="photo"
                      className={addExtraClassNames(
                        "w-full aspect-[3/2]",
                        imgClassName
                      )}
                    />
                  </div>
                  <p className=" text-center mt-4 text-xl">{item.tv_name}</p>
                </div>
              </div>
            );
          }
        })}
      </Carousel>
    </div>
  );
};

CarouselBox.propTypes = {
  slidesToShow: PropTypes.number,
  slidesToShowSmall: PropTypes.number,
  slidesToScroll: PropTypes.number,
  autoplay: PropTypes.bool,
  arrows: PropTypes.bool,
  carouselClassName: PropTypes.string,
  title: PropTypes.string.isRequired,
  data: PropTypes.array,
  wrapperClassName: PropTypes.string,
  imgClassName: PropTypes.string,
  clickAble: PropTypes.bool,
  onClick: PropTypes.func,
  infinite: PropTypes.bool,
  type: PropTypes.string,
  router: PropTypes.object,
};

const CarouselBoxWithRouter = withRouter(CarouselBox);
export default CarouselBoxWithRouter;
