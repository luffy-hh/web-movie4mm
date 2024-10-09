import { Button, Carousel } from "antd";
import { useEffect, useRef } from "react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";
import PropTypes from "prop-types";
import { addExtraClassNames } from "../../utilities/UtilFunctions";
const CarouselBox = ({
  slidesToScroll = 1,
  slidesToShow = 1,
  title,
  className,
}) => {
  const carouselRef = useRef();
  const next = () => {
    carouselRef.current.next();
  };

  const prev = () => {
    carouselRef.current.prev();
  };

  return (
    <div className="w-[70%] mx-auto my-16">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xl font-semibold pb-2 border-b-2 border-[#0769b4]">
          {title}
        </p>
        <div className="flex gap-2">
          <Button onClick={prev}>
            <FaCaretLeft />
          </Button>
          <Button onClick={next}>
            <FaCaretRight />
          </Button>
        </div>
      </div>
      <Carousel
        dots={false}
        draggable={true}
        ref={carouselRef}
        slidesToShow={slidesToShow}
        slidesToScroll={slidesToScroll}
        autoplay={false}
        arrows={false}
        className={addExtraClassNames("h-[20rem]", className)}
      >
        <a href="/" className="px-6">
          <div className="text-blue-700 hover:text-slate-500">
            <div className="h-[100%] bg-no-repeat bg-[length:100%_100%] bg-center">
              <img src="/public/imgs/1.jpg" alt="photo" />
            </div>
            <p className=" text-center mt-4 text-xl">ManU vs Tottenham</p>
          </div>
        </a>
        <a href="/" className="px-6">
          <div className=" text-blue-700 hover:text-slate-500">
            <div className="h-[100%] bg-no-repeat bg-[length:100%_100%] bg-center">
              <img src="/public/imgs/2.jpg" alt="photo" />
            </div>
            <p className=" text-center mt-4 text-xl">ManU vs Tottenham</p>
          </div>
        </a>
        <a href="/" className="px-6">
          <div className=" text-blue-700 hover:text-slate-500">
            <div className="h-[100%] bg-no-repeat bg-[length:100%_100%] bg-center">
              <img src="/public/imgs/3.jpg" alt="photo" />
            </div>
            <p className=" text-center mt-4 text-xl">ManU vs Tottenham</p>
          </div>
        </a>
        <a href="/" className="px-6">
          <div className=" text-blue-700 hover:text-slate-500">
            <div className="h-[100%] bg-no-repeat bg-[length:100%_100%] bg-center">
              <img src="/public/imgs/4.jpg" alt="photo" />
            </div>
            <p className=" text-center mt-4 text-xl">ManU vs Tottenham</p>
          </div>
        </a>
        <a href="/" className="px-6">
          <div className=" text-blue-700 hover:text-slate-500">
            <div className="h-[100%] bg-no-repeat bg-[length:100%_100%] bg-center">
              <img src="/public/imgs/5.jpg" alt="photo" />
            </div>
            <p className=" text-center mt-4 text-xl">ManU vs Tottenham</p>
          </div>
        </a>
        <a href="/" className="px-6">
          <div className=" text-blue-700 hover:text-slate-500">
            <div className="h-[100%] bg-no-repeat bg-[length:100%_100%] bg-center"></div>
            <p className=" text-center mt-4 text-xl">ManU vs Tottenham</p>
          </div>
        </a>
        <a href="/" className="px-6">
          <div className=" text-blue-700 hover:text-slate-500">
            <div className="h-[100%] bg-[url('/public/imgs/1.jpg')] bg-no-repeat bg-[length:100%_100%] bg-center"></div>
            <p className=" text-center mt-4 text-xl">ManU vs Tottenham</p>
          </div>
        </a>
      </Carousel>
    </div>
  );
};

CarouselBox.propTypes = {
  slidesToShow: PropTypes.number,
  slidesToScroll: PropTypes.number,
  autoplay: PropTypes.bool,
  arrows: PropTypes.bool,
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default CarouselBox;
