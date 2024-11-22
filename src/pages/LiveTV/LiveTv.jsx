import React, { useEffect } from "react";
import CarouselBox from "../../components/Boxes/CarouselBox";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllChannelByCategory,
  selectAllChannelByCategory,
  selectAllChannelByCategoryStatus,
} from "../../app/TvChannelSlice/TvChannelSlice.jsx";
import Loader from "../../components/Loader/Loader.jsx";

const LiveTv = () => {
  const dispatch = useDispatch();
  const allChannelByCategory = useSelector(selectAllChannelByCategory);
  const allChannelByCategoryStatus = useSelector(
    selectAllChannelByCategoryStatus,
  );

  useEffect(() => {
    dispatch(fetchAllChannelByCategory({ api: "/all_tv_channel_by_category" }));
  }, []);

  return (
    <>
      {allChannelByCategoryStatus === "loading" ? (
        <Loader spin={true} />
      ) : (
        <div className="my-8">
          {allChannelByCategory.length > 0 &&
            allChannelByCategory?.map((item) => (
              <CarouselBox
                title={item.title}
                data={item.channels}
                key={item.live_tv_category_id}
                slidesToShow={5}
                slidesToShowSmall={3}
                slidesToScroll={1}
                imgClassName={"h-[10rem]"}
                type={"tv"}
              />
            ))}
          {/*<CarouselBox*/}
          {/*  data={[]}*/}
          {/*  slidesToShow={5}*/}
          {/*  slidesToScroll={1}*/}
          {/*  title="Featured TV Channels"*/}
          {/*  imgClassName={"h-[10rem]"}*/}
          {/*/>*/}
          {/*<CarouselBox*/}
          {/*  data={[]}*/}
          {/*  slidesToShow={5}*/}
          {/*  title="Featured Movies"*/}
          {/*  slidesToScroll={1}*/}
          {/*  imgClassName={"h-[10rem]"}*/}
          {/*/>*/}
          {/*<CarouselBox*/}
          {/*  data={[]}*/}
          {/*  slidesToShow={5}*/}
          {/*  title="Movie"*/}
          {/*  slidesToScroll={1}*/}
          {/*  imgClassName={"h-[10rem]"}*/}
          {/*/>*/}
          {/*<CarouselBox*/}
          {/*  slidesToScroll={1}*/}
          {/*  slidesToShow={5}*/}
          {/*  title="Sport"*/}
          {/*  data={[]}*/}
          {/*  imgClassName={"h-[10rem]"}*/}
          {/*/>*/}
          {/*<CarouselBox*/}
          {/*  slidesToScroll={1}*/}
          {/*  slidesToShow={5}*/}
          {/*  title="Kids"*/}
          {/*  data={[]}*/}
          {/*  imgClassName={"h-[10rem]"}*/}
          {/*/>*/}
          {/*<CarouselBox*/}
          {/*  slidesToScroll={1}*/}
          {/*  slidesToShow={5}*/}
          {/*  title="News"*/}
          {/*  data={[]}*/}
          {/*  imgClassName={"h-[10rem]"}*/}
          {/*/>*/}
          {/*<CarouselBox*/}
          {/*  slidesToScroll={1}*/}
          {/*  slidesToShow={5}*/}
          {/*  title="Documentary"*/}
          {/*  data={[]}*/}
          {/*  imgClassName={"h-[10rem]"}*/}
          {/*/>*/}
          {/*<CarouselBox*/}
          {/*  slidesToScroll={1}*/}
          {/*  slidesToShow={5}*/}
          {/*  title="Horror Channel"*/}
          {/*  data={[]}*/}
          {/*  imgClassName={"h-[10rem]"}*/}
          {/*/>*/}
          {/*<CarouselBox*/}
          {/*  slidesToScroll={1}*/}
          {/*  slidesToShow={5}*/}
          {/*  title="Rakuten TV Channels"*/}
          {/*  data={[]}*/}
          {/*  imgClassName={"h-[10rem]"}*/}
          {/*/>*/}
          {/*<CarouselBox*/}
          {/*  slidesToScroll={1}*/}
          {/*  slidesToShow={5}*/}
          {/*  title="Damma"*/}
          {/*  data={[]}*/}
          {/*  imgClassName={"h-[10rem]"}*/}
          {/*/>*/}
          {/*<CarouselBox*/}
          {/*  slidesToScroll={1}*/}
          {/*  slidesToShow={5}*/}
          {/*  title="MM Channel"*/}
          {/*  data={[]}*/}
          {/*  imgClassName={"h-[10rem]"}*/}
          {/*/>*/}
        </div>
      )}
    </>
  );
};

export default LiveTv;
