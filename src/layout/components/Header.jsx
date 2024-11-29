import { lazy, useEffect, useState } from "react";
import { Avatar, Drawer, Dropdown, Layout, Menu } from "antd";

import { afterLoginMenu, sideBarData } from "../../constants/SideBarData";
import { FaBars, FaDesktop, FaX } from "react-icons/fa6";
import CustomInput from "../../components/Inputs/CustomInput";
import { Link } from "react-router-dom";
import withRouter from "../../components/HOCs/withRouter";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllGenres,
  selectAllTvCategory,
  selectYearList,
} from "../../app/HomeSlice/HomeSlice.jsx";
import {
  selectIsDarkMode,
  selectTheme,
  setTheme,
} from "../../app/ThemeConfig/themeConfigSlice.jsx";
import { LuMoon, LuSun } from "react-icons/lu";
import Search from "antd/es/input/Search.js";
import CustomButton from "../../components/Buttons/CustomButton.jsx";
import { logout, selectUser } from "../../app/UserSlice/UserSlice.jsx";
import { FaUser } from "react-icons/fa";

const { Header: AntHeader } = Layout;

const Header = ({ router }) => {
  //   const [isSmallScreen, setIsSmallScreen] = useState(false);
  const dispatch = useDispatch();
  const [openDrawer, setOpenDrawer] = useState(false);
  const isSmallScreen = useSelector((state) => state.theme.isSmallScreen);
  const [renderScreen, setRenderScreen] = useState(false);
  const [categorySelectList, setCategorySelectList] = useState([]);
  const [yearSelectList, setYearSelectList] = useState([]);
  const [keyword, setKeyword] = useState("");
  // console.log(isSmallScreen, sideBarData);
  const genreList = useSelector(getAllGenres);
  const theme = useSelector(selectTheme);
  const isDarkMode = useSelector(selectIsDarkMode);
  const allCategory = useSelector(selectAllTvCategory);
  const yearList = useSelector(selectYearList);
  const currentUser = useSelector(selectUser);
  const items = afterLoginMenu(
    currentUser?.user_name,
    currentUser?.remaining_days,
  );

  useEffect(() => {
    if (allCategory.length > 0) {
      const categoryList = allCategory.map((item) => {
        return {
          key: `/${item.live_tv_category_id}`,
          label: item.title,
          column: "tv",
        };
      });
      categoryList.unshift({
        key: "",
        label: "All Channels",
      });
      setCategorySelectList(categoryList);
    }
  }, [allCategory]);
  useEffect(() => {
    if (yearList.length > 0) {
      const years = yearList.map((item) => {
        return {
          key: `/${item.release_year}`,
          label: item.release_year,
          column: "movie",
        };
      });
      const arr = years.slice(0, 20);
      arr.push({
        key: "",
        label: "See More",
      });
      setYearSelectList(arr);
    }
  }, [yearList]);
  useEffect(() => {
    setRenderScreen(isSmallScreen);
  }, [isSmallScreen]);
  const transformMenuItems = (items) => {
    return items.map((item) => {
      if (item.children) {
        const transformedChildren = item.children.map((childGroup, index) => {
          if (childGroup.type === "group") {
            return {
              type: "group",
              key: `${item.key}-group-${index}`,
              children: childGroup.children.map((child) => ({
                key: child.key,
                label: child.label,
                icon: child?.icon,
              })),
            };
          } else {
            return {
              key: childGroup.key,
              icon: childGroup?.icon,
              label: childGroup.label,
            };
          }
        });

        return {
          key: item.key,
          label: item.label,
          className: item?.className,
          icon: item?.icon,
          popupClassName: item?.popupClassName,
          children: transformedChildren,
        };
      }
      return {
        key: item.key,
        label: item.label,
        icon: item?.icon,
      };
    });
  };

  const drawerTitle = () => {
    return (
      <div className="grid items-center grid-cols-2">
        <Link
          to={"/"}
          onClick={() => setOpenDrawer(false)}
          className={"justify-self-end"}
        >
          <img src="/imgs/logo.png" className="h-12 cursor-pointer" />
        </Link>
        <div className={"justify-self-end"}>
          {theme === "light" ? (
            <button
              className={`${
                theme === "light" &&
                "text-3xl flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
              }`}
              onClick={() => {
                dispatch(setTheme("dark"));
              }}
            >
              <LuSun />
            </button>
          ) : (
            ""
          )}
          {theme === "dark" && (
            <button
              className={`${
                theme === "dark" &&
                "text-3xl text-white flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
              }`}
              onClick={() => {
                dispatch(setTheme("system"));
              }}
            >
              <LuMoon />
            </button>
          )}
          {theme === "system" && (
            <button
              className={`${
                theme === "system" &&
                "text-3xl flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
              } ${isDarkMode ? "text-white" : ""}`}
              onClick={() => {
                dispatch(setTheme("light"));
              }}
            >
              <FaDesktop />
            </button>
          )}
        </div>
      </div>
    );
  };

  const menuItemClickHandler = (e) => {
    // console.log(e);

    const selectedKey = (e.keyPath[1] ? e.keyPath[1] : "") + e?.keyPath[0];
    const selectedItem = sideBarData(
      genreList,
      categorySelectList,
      yearSelectList,
    )
      .flatMap((item) => (item.children ? item.children : []))
      .find((child) => child.key === e.keyPath[0]);
    // console.log(selectedItem, selectedKey, e?.keyPath[0]);
    const column = selectedItem ? selectedItem.column : null;
    // console.log(column);

    router.nav(selectedKey, {
      state: {
        type: column,
      },
    });
  };

  return (
    <AntHeader
      className={`flex h-auto flex-wrap ${
        isSmallScreen ? "justify-between py-2 px-4" : "justify-center"
      } ${isDarkMode ? "" : "bg-gray-400"} items-center gap-4 py-4 text-white`} //bg-[#0769b4] text-white h-20 border-l-2 border-l-zinc-700
    >
      <Link to={"/"} className="flex items-center">
        <img src="/imgs/logo.png" className="h-12 cursor-pointer" />
      </Link>
      {isSmallScreen && (
        <div
          className="text-white text-3xl"
          onClick={() => setOpenDrawer(true)}
        >
          <FaBars />
        </div>
      )}
      {!isSmallScreen && (
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <Menu
            className={`${
              isDarkMode ? "" : "bg-gray-400"
            } flex items-center justify-center gap-4`}
            onClick={(e) => {
              setOpenDrawer(false);
              // console.log(e);

              router.nav((e.keyPath[1] ? e.keyPath[1] : "") + e?.keyPath[0], {
                state: {
                  type: e?.item?.props?.column,
                },
              });
              // console.log(e);
            }}
            mode="horizontal"
            theme={isDarkMode ? "dark" : "light"}
            items={sideBarData(genreList, categorySelectList, yearSelectList)}
          />
          <Search
            placeholder="Search"
            className={"w-[20rem]"}
            value={keyword}
            onSearch={(value) => {
              // console.log(value);

              router.nav(`/search`, {
                state: {
                  keyword,
                },
              });
            }}
            enterButton={true}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <div>
            {theme === "light" && (
              <button
                className={`${
                  theme === "light" &&
                  "text-3xl flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                }`}
                onClick={() => {
                  dispatch(setTheme("dark"));
                }}
              >
                <LuSun />
              </button>
            )}
            {theme === "dark" && (
              <button
                className={`${
                  theme === "dark" &&
                  "text-3xl flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                }`}
                onClick={() => {
                  dispatch(setTheme("system"));
                }}
              >
                <LuMoon />
              </button>
            )}
            {theme === "system" && (
              <button
                className={`${
                  theme === "system" &&
                  "text-3xl flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                }`}
                onClick={() => {
                  dispatch(setTheme("light"));
                }}
              >
                <FaDesktop />
              </button>
            )}
          </div>
          {!currentUser ? (
            <CustomButton
              click={() => router.nav("/login")}
              text={"Login"}
              className={"ml-5"}
            />
          ) : (
            <Dropdown
              menu={{
                items,
                onClick: (e) => {
                  if (e.key === "logout") {
                    dispatch(logout());
                  }
                  if (e.key === "fav-list") {
                    router.nav("fav-list");
                  }
                },
              }}
            >
              <Avatar icon={<FaUser />} />
            </Dropdown>
          )}
        </div>
      )}
      <Drawer
        title={drawerTitle()}
        closeIcon={
          <div style={{ color: isDarkMode ? "white" : "black" }}>
            <FaX />
          </div>
        }
        height={"auto"}
        getContainer={false}
        styles={{
          header: {
            padding: "4px 10px",
            background: isDarkMode ? "#001529" : "#fff",
          },
          body: {
            padding: 0,
            background: isDarkMode ? "#001529" : "#fff",
          },
        }}
        placement={"right"}
        width={500}
        onClose={() => {
          setOpenDrawer(false);
        }}
        open={openDrawer}
      >
        <div className={"flex flex-col"}>
          <Search
            placeholder="Search"
            className={"w-[80%] mx-auto"}
            onSearch={(value) => {
              router.nav(`/search`, {
                state: {
                  keyword,
                },
              });
            }}
            enterButton={true}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Menu
            mode="inline"
            theme={isDarkMode ? "dark" : "light"}
            items={transformMenuItems(
              sideBarData(genreList, categorySelectList, yearSelectList),
            )}
            onClick={menuItemClickHandler}
          />
          {!currentUser && (
            <CustomButton
              click={() => router.nav("/login")}
              text={"Login"}
              className={"w-[20rem] mx-auto mt-5"}
            />
          )}
          {currentUser && (
            <div className="flex items-center justify-around mt-5">
              {/* <CustomButton
                text={currentUser?.user_name}
                icon={<FaUser />}
                click={() => {
                  router.nav("/profile");
                }}
              /> */}
              <CustomButton
                click={() => {
                  dispatch(logout());
                }}
                text={"Logout"}
                className={"w-[20rem]"}
              />
            </div>
          )}
        </div>
      </Drawer>
    </AntHeader>
  );
};
Header.propTypes = {
  router: PropTypes.object,
};
const HeaderWithRouter = withRouter(Header);
export default HeaderWithRouter;
