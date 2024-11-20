import { lazy, useEffect, useState } from "react";
import { Drawer, Layout, Menu } from "antd";

import { sideBarData } from "../../constants/SideBarData";
import { FaBars, FaX } from "react-icons/fa6";
import CustomInput from "../../components/Inputs/CustomInput";
import { Link } from "react-router-dom";
import withRouter from "../../components/HOCs/withRouter";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getAllGenres } from "../../app/HomeSlice/HomeSlice.jsx";

const { Header: AntHeader } = Layout;

const Header = ({ router }) => {
  //   const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const isSmallScreen = useSelector((state) => state.theme.isSmallScreen);
  const [renderScreen, setRenderScreen] = useState(false);
  // console.log(isSmallScreen, sideBarData);
  const genreList = useSelector(getAllGenres);

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
          className: item.className,
          icon: item?.icon,
          popupClassName: item.popupClassName,
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
      <div className="flex justify-center items-center">
        <Link to={"/"} onClick={() => setOpenDrawer(false)}>
          <img src="/imgs/logo.png" className="h-12 cursor-pointer" />
        </Link>
      </div>
    );
  };

  const menuItemClickHandler = (e) => {
    const selectedKey = (e.keyPath[1] ? e.keyPath[1] : "") + e?.keyPath[0];
    const selectedItem = sideBarData(genreList).find((item) => {
      console.log(item, e.keyPath[0]);

      return item.key === e?.keyPath[0];
    });
    console.log(selectedKey);
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
      } items-center gap-4 py-4 text-white`} //bg-[#0769b4] text-white h-20 border-l-2 border-l-zinc-700
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
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Menu
            onClick={(e) => {
              setOpenDrawer(false);
              router.nav((e.keyPath[1] ? e.keyPath[1] : "") + e?.keyPath[0], {
                state: {
                  type: e?.item?.props?.column,
                },
              });
              // console.log(e);
            }}
            mode="horizontal"
            theme="dark"
            items={sideBarData(genreList)}
          />
          <CustomInput placeholder="Search" className={"w-[20rem]"} />
        </div>
      )}
      <Drawer
        title={drawerTitle()}
        closeIcon={
          <div className="text-white">
            <FaX />
          </div>
        }
        height={"auto"}
        getContainer={false}
        styles={{
          header: {
            padding: "4px 10px",
            background: "#001529",
          },
          body: {
            padding: 0,
            background: "#001529",
          },
        }}
        placement={"right"}
        width={500}
        onClose={() => {
          setOpenDrawer(false);
        }}
        open={openDrawer}
      >
        <Menu
          mode="inline"
          theme="dark"
          items={transformMenuItems(sideBarData(genreList))}
          onClick={menuItemClickHandler}
        />
      </Drawer>
    </AntHeader>
  );
};
Header.propTypes = {
  router: PropTypes.object,
};
const HeaderWithRouter = withRouter(Header);
export default HeaderWithRouter;
