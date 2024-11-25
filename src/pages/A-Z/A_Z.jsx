import { Avatar, ConfigProvider, Flex, List, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { aToZ } from "../../constants/FilterData";
import Loader from "../../components/Loader/Loader";
import PagesTitle from "../../components/PagesTitle";
import { dummyList } from "../../constants/dummyData";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  contentByAToZSelector,
  contentByAToZStatusSelector,
  contentByAToZTotalSelector,
  fetchContentByAToZ,
} from "../../app/MovieSlice/MovieSlice.jsx";
import { selectIsDarkMode } from "../../app/ThemeConfig/themeConfigSlice.jsx";

const A_Z = () => {
  const dispatch = useDispatch();
  const contentByAToZ = useSelector(contentByAToZSelector);
  const contentByAToZStatus = useSelector(contentByAToZStatusSelector);
  const contentByAToZTotal = useSelector(contentByAToZTotalSelector);
  const isDarkMode = useSelector(selectIsDarkMode);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 24,
    total: 0,
    position: "bottom",
    align: "center",
    showSizeChanger: false,
    className: isDarkMode ? "dark" : "",
    onChange: (page) => {
      setPagination((prev) => ({ ...prev, current: page }));
    },
  });
  const [key, setKey] = useState("09");
  useEffect(() => {
    dispatch(
      fetchContentByAToZ({
        api: `/a_z_moives?page=${pagination.current}&title=${key}`,
      }),
    );
  }, [dispatch, key, pagination.current]);

  useEffect(() => {
    if (contentByAToZStatus === "success") {
      setPagination((prev) => ({
        ...prev,
        total: contentByAToZTotal,
        pageSize: contentByAToZ.length,
      }));
    }
  }, [contentByAToZStatus]);
  console.log(contentByAToZ);

  // useEffect(() => {
  //   setData(aToZ.push());
  // console.log(aToZ,aToZ.length);
  // }, [aToZ]);
  // console.log(data);
  return (
    <div className="mx-auto w-full mb-5">
      <PagesTitle
        title={"Movies By Letter"}
        className={`mb-4 ${isDarkMode && "text-white"}`}
      />
      <ConfigProvider
        theme={{
          components: {
            Tabs: {
              cardBg: "#060606",
              itemColor: "#ffffff",
            },
          },
        }}
      >
        <Tabs
          tabBarGutter={3}
          defaultActiveKey="number"
          tabPosition="top"
          type="card"
          onChange={(key) => {
            setKey(key);
            setPagination((prev) => ({ ...prev, current: 1 }));
          }}
          // cardBg="#060606"
          items={aToZ.map((item) => ({
            ...item,
            children: (
              <div
                className={`${
                  isDarkMode ? "bg-zinc-900 text-white" : "bg-white"
                }`}
              >
                <div className="flex items-center sm:w-[100%] w-full  text-lg font-bold overflow-x-scroll hide-scrollbar">
                  <p className="p-2 mr-5">#</p>
                  <p className="flex-1 mr-5">{contentByAToZTotal} Results</p>
                  <p className="flex-1 mr-5 text-center">Year</p>
                  <p className="flex-1 mr-5">Country</p>
                  <p className="flex-1 mr-5">Genre</p>
                  <p className=" text-start w-20">IMDB</p>
                </div>
                <List
                  dataSource={contentByAToZ}
                  pagination={pagination}
                  loading={contentByAToZStatus === "loading"}
                  className={`overflow-auto hide-scrollbar w-full ${
                    isDarkMode && "bg-zinc-900"
                  }`}
                  renderItem={(item, index) => (
                    <List.Item
                      className={`${
                        isDarkMode && "text-white"
                      } flex items-center w-full !flex-nowrap`}
                      key={item.id}
                    >
                      <p className={`p-2 mr-5 ${isDarkMode && " text-white"} `}>
                        {index + 1}
                      </p>
                      <p
                        className={`flex-1 mr-5 flex gap-4 items-center max-w-content ${
                          isDarkMode && " text-white"
                        }`}
                      >
                        {item?.thumbnail_url && (
                          <Avatar
                            src={item.thumbnail_url}
                            className="inline-block min-w-10"
                          />
                        )}
                        <Link
                          to={`/watch/${
                            item.is_tvseries == "1" ? "tvseries" : "movie"
                          }/${item.id}`}
                          className=" inline-block"
                        >
                          {item.title}
                        </Link>
                      </p>
                      <p
                        className={`flex-1 mr-5 text-center ${
                          isDarkMode && " text-white"
                        }`}
                      >
                        {item.release}
                      </p>
                      <p
                        className={`flex-1 mr-5 ${isDarkMode && " text-white"}`}
                      >
                        {item.genre.length > 0 &&
                          item.genre.map((c) => (
                            <Link
                              to={`/country/${c.country_id}`}
                              state={{ ...c }}
                              key={c.country_id}
                            >
                              {c.name},{" "}
                            </Link>
                          ))}
                      </p>
                      <p
                        className={`flex-1 mr-5 ${isDarkMode && " text-white"}`}
                      >
                        {item.country.length > 0 &&
                          item.country.map((g) => (
                            <Link
                              to={`/genre/${g.genre_id}`}
                              state={{ ...g, type: g.name }}
                              key={g.genre_id}
                            >
                              {g.name},{" "}
                            </Link>
                          ))}
                        {/* {console.log(typeof item.genre)} */}
                      </p>
                      <p
                        className={`text-start w-20 ${
                          isDarkMode && " text-white"
                        }`}
                      >
                        {item.imdb_rating}
                      </p>
                      {/* <Badge count={item.freq} color="#faad14" /> */}
                    </List.Item>
                  )}
                />
              </div>
            ),
          }))}
        ></Tabs>
      </ConfigProvider>

      {/* <List /> */}
    </div>
  );
};

export default A_Z;
