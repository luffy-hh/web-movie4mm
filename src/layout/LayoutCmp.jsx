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

const LayoutCmp = ({}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const nav = useNavigate();
  const [showTopButton, setShowTopButton] = useState(false);
  const isSmallScreen = useSelector((state) => state.theme.isSmallScreen);

  // console.log(carsFull, driversFull);
  // const { car_no } = location.state;
  const { Content } = Layout;

  const getTitle = (path) => {
    if (path.includes("/cars")) return "Cars List";
    if (path.includes("/drivers")) return "Drivers List";
    if (path.includes("/driving-history")) return "Driving Ways";
    if (path.includes("/reports")) return "Reports";
    if (path.includes("/fuel")) return "Fuel Records";
    if (path.includes("/maintenance")) return "Maintenance Records";
    if (path.includes("/user-management")) return "User Manage";
    if (path.includes("/")) return "Home | Movie4mm";
    return "Home";
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
  }, []);

  useEffect(() => {
    document.title = getTitle(location.pathname);
  }, [location.pathname]);
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
        <Layout>
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
      </Layout>
    </Suspense>
  );
};

LayoutCmp.propTypes = {
  setIsSmallScreen: PropTypes.func,
  isSmallScreen: PropTypes.bool,
};
export default LayoutCmp;
