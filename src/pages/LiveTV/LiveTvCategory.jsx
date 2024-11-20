import React from "react";
import { useParams } from "react-router-dom";
import CarouselBox from "../../components/Boxes/CarouselBox";

const LiveTvCategory = () => {
  const { name } = useParams();
  //   console.log(name);
  return (
    <div className="w-full h-full mx-auto">
      <CarouselBox
        data={[]}
        slidesToShow={5}
        title={`${name
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
