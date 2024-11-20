import { Breadcrumb } from "antd";
import React from "react";
import { useLocation, useParams } from "react-router-dom";
import GridBox from "../../components/Boxes/GridBox";
import ListPageTitle from "../../components/ListPageTitle";

const Genre = () => {
  const { id } = useParams();
  const location = useLocation();
  const { type } = location.state;
  const routes = [
    {
      path: "/",
      breadcrumbName: "Home",
    },
    {
      path: `/genre/${id}`,
      breadcrumbName: type.toUpperCase(),
    },
  ];
  //   console.log(type);
  return (
    <div className="my-8">
      <ListPageTitle routes={routes} title={`GENRE: ${type?.toUpperCase()}`} />
      <GridBox
        cardClassName={"!p-0"}
        grid={{ gutter: 16, xs: 2, sm: 2, md: 3, lg: 5, xl: 6, xxl: 6 }}
      />
    </div>
  );
};

export default Genre;
