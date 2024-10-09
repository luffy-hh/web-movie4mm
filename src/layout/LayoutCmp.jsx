import React, { useEffect, useState } from "react";
// import SideBar from "../components/Bars/SideBar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { Layout } from "antd";
import Header from "./components/Header.jsx";

const LayoutCmp = ({ setIsSmallScreen, isSmallScreen }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const nav = useNavigate();
  const [showTopButton, setShowTopButton] = useState(false);

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
  const handleMenuClick = (e) => {
    nav(e.key);
  };
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
    document.title = getTitle(location.pathname);
  }, [location.pathname]);
  return (
    <Layout className=" antialiased">
      {/* {isSmallScreen ? (
        <Sider
          style={{
            minHeight: "100vh",
            maxHeight: "auto",
            backgroundColor: "#343a3f",
          }}
          className="custom-sider"
          breakpoint="md"
          zeroWidthTriggerStyle={{ top: "10px" }}
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            // console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            // console.log(collapsed, type);
          }}
        >
          <div
            className=" text-white text-center px-5 py-7 cursor-pointer bg-[#0769b4]"
            onClick={() => nav("/")}
          >
            Linn Car DB
          </div>
          <Menu
            style={{
              backgroundColor: "#343a3f ",
            }}
            theme="dark"
            mode="inline"
            selectedKeys={`/${location.pathname.split("/")[1]}`}
            items={sideBarData}
            onClick={handleMenuClick}
          />
        </Sider>
      ) : (
        <Menu
          theme="dark"
          mode="horizontal"
          items={sideBarData}
          onClick={handleMenuClick}
        />
      )} */}
      <div className="fixed bottom-6 right-40 rtl:left-6 z-50">
        {showTopButton && (
          <button
            type="button"
            className="rounded-full p-2 animate-pulse bg-white border-[#C427C4] border-2 shadow-lg hover:shadow-xl"
            onClick={goToTop}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
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
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

LayoutCmp.propTypes = {
  setIsSmallScreen: PropTypes.func,
  isSmallScreen: PropTypes.bool,
};
export default LayoutCmp;
