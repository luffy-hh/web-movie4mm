import React from "react";
import GridBox from "../../components/Boxes/GridBox";
import ListPageTitle from "../../components/ListPageTitle";
import { useParams } from "react-router-dom";

const Release = () => {
  const { year } = useParams();
  const routes = [
    {
      path: "/",
      breadcrumbName: "Home",
    },
    {
      path: `/release/${year}`,
      breadcrumbName: year,
    },
  ];
  return (
    <div className="my-8">
      <ListPageTitle routes={routes} title={`Release: ${year}`} />
      <GridBox
        cardClassName={"!p-0"}
        grid={{ gutter: 16, xs: 2, sm: 2, md: 3, lg: 5, xl: 6, xxl: 6 }}
      />
    </div>
  );
};

export default Release;
