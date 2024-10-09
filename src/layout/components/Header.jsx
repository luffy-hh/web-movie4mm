import { useEffect, useState } from "react";
import { Drawer, Layout, Menu } from "antd";
import { sideBarData } from "../../constants/SideBarData";
import { FaBars, FaX } from "react-icons/fa6";
import CustomInput from "../../components/Inputs/CustomInput";
import { Link } from "react-router-dom";
import withRouter from "../../components/HOCs/withRouter";
import PropTypes from "prop-types";

const { Header: AntHeader } = Layout;

const Header = ({ router, ...props }) => {
  //   const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  console.log(props.isSmallScreen);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    const handleMediaQueryChange = (e) => {
      props.setIsSmallScreen(e.matches);
    };

    // Set the initial value
    props.setIsSmallScreen(mediaQuery.matches);

    // Add the listener
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Clean up the listener on component unmount
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

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
          <img src="/public/imgs/logo.png" className="h-12 cursor-pointer" />
        </Link>
      </div>
    );
  };

  return (
    <AntHeader
      className={`flex h-auto ${
        props.isSmallScreen ? "justify-between py-2 px-4" : "justify-center"
      } items-center gap-4 text-white`} //bg-[#0769b4] text-white h-20 border-l-2 border-l-zinc-700
    >
      <Link to={"/"} className="flex items-center">
        <img src="/public/imgs/logo.png" className="h-12 cursor-pointer" />
      </Link>
      {props.isSmallScreen && (
        <div
          className="text-white text-3xl"
          onClick={() => setOpenDrawer(true)}
        >
          <FaBars />
        </div>
      )}
      {!props.isSmallScreen && (
        <>
          <Menu
            onClick={(e) => {
              router.nav((e.keyPath[1] ? e.keyPath[1] : "") + e?.keyPath[0]);
              //   console.log(e);
            }}
            mode="horizontal"
            theme="dark"
            items={sideBarData}
          />

          <CustomInput placeholder="Search" className={"w-[20rem]"} />
        </>
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
            height: "auto",
            padding: "4px 10px",
            background: "#001529",
          },
          body: {
            padding: 0,
          },
        }}
        placement={"top"}
        width={500}
        onClose={() => {
          setOpenDrawer(false);
        }}
        open={openDrawer}
      >
        <Menu
          mode="inline"
          theme="dark"
          items={transformMenuItems(sideBarData)}
          onClick={(e) => {
            setOpenDrawer(false);
            router.nav((e.keyPath[1] ? e.keyPath[1] : "") + e?.keyPath[0]);
            // console.log(e);
          }}
        />
      </Drawer>
    </AntHeader>
  );
};
Header.propTypes = {
  router: PropTypes.object,
  setIsSmallScreen: PropTypes.func,
  isSmallScreen: PropTypes.bool,
};
const HeaderWithRouter = withRouter(Header);
export default HeaderWithRouter;
