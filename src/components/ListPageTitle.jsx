import { Breadcrumb } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ListPageTitle = ({ routes, title }) => {
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
      <p className="text-3xl">{title}</p>
      <Breadcrumb items={items(routes)} />
    </div>
  );
};

ListPageTitle.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  routes: PropTypes.array,
};

export default ListPageTitle;
