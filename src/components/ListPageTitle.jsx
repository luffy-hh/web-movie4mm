import { Breadcrumb } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { addExtraClassNames } from "../utilities/UtilFunctions.jsx";
import { useSelector } from "react-redux";
import { selectIsDarkMode } from "../app/ThemeConfig/themeConfigSlice.jsx";

const ListPageTitle = ({ routes, title, titleClass = "" }) => {
  const isDarkMode = useSelector(selectIsDarkMode);
  const items = (routes) => {
    return routes.map((route, index) => {
      return {
        title: route.breadcrumbName,
        key: index,
        href: route.path,
      };
    });
  };
  return (
    <div className="flex justify-between">
      <p className={addExtraClassNames("text-3xl ", titleClass)}>{title}</p>
      <Breadcrumb items={items(routes)} className={isDarkMode && "dark"} />
    </div>
  );
};

ListPageTitle.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  routes: PropTypes.array,
  titleClass: PropTypes.string,
};

export default ListPageTitle;
