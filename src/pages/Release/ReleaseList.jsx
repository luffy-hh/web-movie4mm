import React, { useEffect, useState } from "react";
import {
  selectYearList,
  selectYearListStatus,
} from "../../app/HomeSlice/HomeSlice.jsx";
import { useSelector } from "react-redux";

import ListPageTitle from "../../components/ListPageTitle.jsx";
import { List, Tag } from "antd";
import { Link } from "react-router-dom";

const ReleaseList = () => {
  const yearList = useSelector(selectYearList);
  const yearListStatus = useSelector(selectYearListStatus);
  const [fixYears, setFixYears] = useState([]);
  console.log(yearList);
  useEffect(() => {
    const years = yearList.slice(0, -1);
    setFixYears(years);
  }, [yearList]);

  return (
    <div className={"my-4"}>
      <ListPageTitle
        routes={[
          {
            path: "/",
            breadcrumbName: "Home",
          },
          {
            path: "/release",
            breadcrumbName: "Release",
          },
        ]}
        title={"Filter Movies by Year"}
      />
      <div className={"my-4"}>
        <List
          loading={yearListStatus === "loading"}
          dataSource={fixYears}
          grid={{ gutter: 16, xs: 2, sm: 4, md: 6, lg: 8, xl: 10, xxl: 12 }}
          renderItem={(item) => (
            <List.Item>
              <Tag color={"#7e22ce"} className={"text-xl p-4"}>
                <Link to={`/release/${item.release_year}`}>
                  {item.release_year}
                </Link>
              </Tag>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};
export default ReleaseList;
