import React from "react";
import CarouselBox from "../../components/Boxes/CarouselBox";

const LiveTv = () => {
  return (
    <div className="my-8">
      <CarouselBox
        data={[]}
        slidesToShow={5}
        slidesToScroll={1}
        title="Featured TV Channels"
        imgClassName={"h-[10rem]"}
      />
      <CarouselBox
        data={[]}
        slidesToShow={5}
        title="Featured Movies"
        slidesToScroll={1}
        imgClassName={"h-[10rem]"}
      />
      <CarouselBox
        data={[]}
        slidesToShow={5}
        title="Movie"
        slidesToScroll={1}
        imgClassName={"h-[10rem]"}
      />
      <CarouselBox
        slidesToScroll={1}
        slidesToShow={5}
        title="Sport"
        data={[]}
        imgClassName={"h-[10rem]"}
      />
      <CarouselBox
        slidesToScroll={1}
        slidesToShow={5}
        title="Kids"
        data={[]}
        imgClassName={"h-[10rem]"}
      />
      <CarouselBox
        slidesToScroll={1}
        slidesToShow={5}
        title="News"
        data={[]}
        imgClassName={"h-[10rem]"}
      />
      <CarouselBox
        slidesToScroll={1}
        slidesToShow={5}
        title="Documentary"
        data={[]}
        imgClassName={"h-[10rem]"}
      />
      <CarouselBox
        slidesToScroll={1}
        slidesToShow={5}
        title="Horror Channel"
        data={[]}
        imgClassName={"h-[10rem]"}
      />
      <CarouselBox
        slidesToScroll={1}
        slidesToShow={5}
        title="Rakuten TV Channels"
        data={[]}
        imgClassName={"h-[10rem]"}
      />
      <CarouselBox
        slidesToScroll={1}
        slidesToShow={5}
        title="Damma"
        data={[]}
        imgClassName={"h-[10rem]"}
      />
      <CarouselBox
        slidesToScroll={1}
        slidesToShow={5}
        title="MM Channel"
        data={[]}
        imgClassName={"h-[10rem]"}
      />
    </div>
  );
};

export default LiveTv;
