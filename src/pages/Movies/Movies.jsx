import React from "react";
import ListPageTitle from "../../components/ListPageTitle";
import GridBox from "../../components/Boxes/GridBox";
import Container from "../../components/Container";
import Filters from "../../components/Filters/Filters";

const Movies = () => {
  return (
    <Container className="my-8">
      <ListPageTitle
        routes={[
          {
            path: "/",
            breadcrumbName: "Home",
          },
          {
            path: "/movies",
            breadcrumbName: "Movies",
          },
        ]}
        title={"WATCH MOVIES"}
      />
      <div className="flex gap-2 mt-2">
        <Filters />
        <GridBox
          className={"flex-1"}
          cardClassName={"!p-0"}
          grid={{ gutter: 16, xs: 2, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
        />
      </div>
    </Container>
  );
};

export default Movies;
