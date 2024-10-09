import { Button, Carousel, ConfigProvider } from "antd";
import React from "react";
import PropTypes from "prop-types";
import CarouselBox from "../components/Boxes/CarouselBox";
const Home = ({ isSmallScreen }) => {
  return (
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
            className={`h-[40rem] ${
              isSmallScreen ? "w-full" : "w-[70%]"
            } mx-auto mt-8 bg-slate-400/10 rounded-xl overflow-hidden`}
          >
            <a href="/">
              <div className="h-[40rem] bg-[url('/public/imgs/1.jpg')] bg-no-repeat bg-[length:100%_100%] bg-center group relative">
                <div className="p-4 w-[20rem] bg-slate-700/40 h-full text-white absolute left-0 transform translate-x-[-20rem] opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                  <p className="text-2xl text-blue-600">Sea</p>
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
            </a>
            <a href="/">
              <div className="h-[40rem] bg-[url('/public/imgs/2.jpg')] bg-no-repeat bg-[length:100%_100%] bg-center group relative">
                <div className="p-4 w-[20rem] bg-slate-700/40 h-full text-white absolute left-0 transform translate-x-[-20rem] opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                  <p className="text-2xl text-blue-600">Sunset</p>
                  <div className="p-2 border bg-slate-900/80">
                    <div>
                      <strong>Release:</strong> 2022
                    </div>
                    <div>
                      <strong>IMDB:</strong> 9
                    </div>
                  </div>
                  <Button type="primary" className="mt-2">
                    Watch Now
                  </Button>
                </div>
              </div>
            </a>
            <a href="/">
              <div className="h-[40rem] bg-[url('/public/imgs/3.jpg')] bg-no-repeat bg-[length:100%_100%] bg-center group relative">
                <div className="p-4 w-[20rem] bg-slate-700/40 h-full text-white absolute left-0 transform translate-x-[-20rem] opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                  <p className="text-2xl text-blue-600">Old</p>
                  <div className="p-2 border bg-slate-900/80">
                    <div>
                      <strong>Release:</strong> 2016
                    </div>
                    <div>
                      <strong>IMDB:</strong> 8.8
                    </div>
                  </div>
                  <Button type="primary" className="mt-2">
                    Watch Now
                  </Button>
                </div>
              </div>
            </a>
            <a href="/">
              <div className="h-[40rem] bg-[url('/public/imgs/4.jpg')] bg-no-repeat bg-[length:100%_100%] bg-center group relative">
                <div className="p-4 w-[20rem] bg-slate-700/40 h-full text-white absolute left-0 transform translate-x-[-20rem] opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                  <p className="text-2xl text-blue-600">Horror</p>
                  <div className="p-2 border bg-slate-900/80">
                    <div>
                      <strong>Release:</strong> 2021
                    </div>
                    <div>
                      <strong>IMDB:</strong> 7.6
                    </div>
                  </div>
                  <Button type="primary" className="mt-2">
                    Watch Now
                  </Button>
                </div>
              </div>
            </a>
            <a href="/">
              <div className="h-[40rem] bg-[url('/public/imgs/5.jpg')] bg-no-repeat bg-[length:100%_100%] bg-center group relative">
                <div className="p-4 w-[20rem] bg-slate-700/40 h-full text-white absolute left-0 transform translate-x-[-20rem] opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                  <p className="text-2xl text-blue-600">Action</p>
                  <div className="p-2 border bg-slate-900/80">
                    <div>
                      <strong>Release:</strong> 2020
                    </div>
                    <div>
                      <strong>IMDB:</strong> 9.1
                    </div>
                  </div>
                  <Button type="primary" className="mt-2">
                    Watch Now
                  </Button>
                </div>
              </div>
            </a>
            <a href="/">
              <div className="h-[40rem] bg-[url('/public/imgs/6.jpg')] bg-no-repeat bg-[length:100%_100%] bg-center group relative">
                <div className="p-4 w-[20rem] bg-slate-700/40 h-full text-white absolute left-0 transform translate-x-[-20rem] opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                  <p className="text-2xl text-blue-600">India</p>
                  <div className="p-2 border bg-slate-900/80">
                    <div>
                      <strong>Release:</strong> 2009
                    </div>
                    <div>
                      <strong>IMDB:</strong> 7.1
                    </div>
                  </div>
                  <Button type="primary" className="mt-2">
                    Watch Now
                  </Button>
                </div>
              </div>
            </a>
          </Carousel>
        </ConfigProvider>
      </div>
      <CarouselBox slidesToShow={3} slidesToScroll={1} title={"Live-Sport"} />
      <CarouselBox
        slidesToShow={5}
        slidesToScroll={1}
        title={"Featured TV Channels"}
      />
    </>
  );
};

Home.propTypes = {
  isSmallScreen: PropTypes.bool,
};

export default Home;
