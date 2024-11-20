import React, { lazy, Suspense, useEffect, useState } from "react";
// import SideBar from "../components/Bars/SideBar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { Layout } from "antd";

const Header = lazy(() => import("./components/Header.jsx"));
import Footer from "./components/Footer.jsx";
import Loader from "../components/Loader/Loader.jsx";
import { setIsSmallScreen } from "../app/ThemeConfig/themeConfigSlice.jsx";
import { fetchAllGenre } from "../app/HomeSlice/HomeSlice.jsx";

const LayoutCmp = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const nav = useNavigate();
  const [showTopButton, setShowTopButton] = useState(false);
  const isSmallScreen = useSelector((state) => state.theme.isSmallScreen);

  // console.log(carsFull, driversFull);
  // const { car_no } = location.state;
  const { Content } = Layout;

  const getTitle = (path) => {
    if (path.includes("/genre")) return "Genres | Movie4mm";
    if (path.includes("/release")) return "Release | Movie4mm";
    if (path.includes("/movies")) return "Movies | Movie4mm";
    if (path.includes("/series")) return "Series | Movie4mm";
    if (path.includes("/a-z")) return "A-Z | Movie4mm";
    if (path.includes("/watch")) return "Watch | Movie4mm";
    if (path.includes("/live-tv")) return "Live | Movie4mm";
    if (path.includes("/watch-live")) return "Watch-Live | Movie4mm";

    return "Home | Movie4mm";
  };
  // const handleMenuClick = (e) => {
  //   nav(e.key);
  // };
  const goToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const onScrollHandler = () => {
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      setShowTopButton(true);
    } else {
      setShowTopButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScrollHandler);

    // const screenLoader = document.getElementsByClassName("screen_loader");
    // if (screenLoader?.length) {
    //   screenLoader[0].classList.add("animate__fadeOut");
    //   setTimeout(() => {
    //     setShowLoader(false);
    //   }, 200);
    // }

    return () => {
      window.removeEventListener("onscroll", onScrollHandler);
    };
  }, []);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    const handleMediaQueryChange = (e) => {
      dispatch(setIsSmallScreen(e.matches));
    };

    // Set the initial value
    setIsSmallScreen(mediaQuery.matches);

    // Add the listener
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Clean up the listener on component unmount
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchAllGenre({ api: "/all_genre" }));
  }, [dispatch]);

  useEffect(() => {
    document.title = getTitle(location.pathname);
  }, [location.pathname]);

  useEffect(() => {}, []);
  return (
    <Suspense fallback={<Loader spin={true} fullscreen={true} />}>
      <Layout className=" antialiased">
        <div
          className={`fixed ${
            showTopButton ? "move-to-top" : "move-to-bottom"
          } ani right-[10%] rtl:left-6 z-50`}
        >
          {showTopButton && (
            <button
              type="button"
              className="rounded-full p-2 bg-[#C427C4] border-[#C427C4] border-2 shadow-lg hover:shadow-xl"
              onClick={goToTop}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7l4-4m0 0l4 4m-4-4v18"
                />
              </svg>
            </button>
          )}
        </div>

        <Header
          isSmallScreen={isSmallScreen}
          setIsSmallScreen={setIsSmallScreen}
        />
        <Content
          className={`${isSmallScreen ? "px-2 w-full" : "w-[70%] mx-auto"}`}
        >
          <Outlet />
        </Content>
        <Footer />
      </Layout>
    </Suspense>
  );
};

export default LayoutCmp;
