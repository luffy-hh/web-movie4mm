import { Avatar, ConfigProvider, Flex, List, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { aToZ } from "../../constants/FilterData";
import Loader from "../../components/Loader/Loader";
import PagesTitle from "../../components/PagesTitle";
import { dummyList } from "../../constants/dummyData";
import { Link } from "react-router-dom";

const A_Z = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [key, setKey] = useState("number");
  // useEffect(() => {
  //   setData(aToZ.push());
  // console.log(aToZ,aToZ.length);
  // }, [aToZ]);
  // console.log(data);
  return (
    <div className="mx-auto w-full">
      <PagesTitle title={"Movies By Letter"} className={"mb-4"} />
      <ConfigProvider
        theme={{
          components: {
            Tabs: { cardBg: "#060606", itemColor: "#ffffff" },
          },
        }}
      >
        <Tabs
          tabBarGutter={3}
          defaultActiveKey="number"
          tabPosition="top"
          type="card"
          onChange={(key) => setKey(key)}
          // cardBg="#060606"
          items={aToZ.map((item) => ({
            ...item,
            children: (
              <div className="bg-white">
                <div className="flex items-center sm:w-[100%] w-full  text-lg font-bold overflow-x-scroll hide-scrollbar">
                  <p className="p-2 mr-5">#</p>
                  <p className="flex-1 mr-5">{dummyList.length} Results</p>
                  <p className="flex-1 mr-5">Year</p>
                  <p className="flex-1 mr-5">Country</p>
                  <p className="flex-1 mr-5">Genre</p>
                  <p className=" text-start w-20">IMDB</p>
                </div>
                <List
                  dataSource={dummyList}
                  pagination={true}
                  className={"overflow-auto hide-scrollbar w-full"}
                  renderItem={(item, index) => (
                    <List.Item
                      className={"flex items-center w-full !flex-nowrap"}
                      key={item.title}
                    >
                      <p className="p-2 mr-5">{index + 1}</p>
                      <p className="flex-1 mr-5 flex gap-4 items-center max-w-content">
                        {item?.img && (
                          <Avatar
                            src={item.img}
                            className="inline-block min-w-10"
                          />
                        )}
                        <span className=" inline-block">{item.title}</span>
                      </p>
                      <p className="flex-1 mr-5 text-end">{item.year}</p>
                      <p className="flex-1 mr-5">
                        {typeof item.country === "object"
                          ? item.country.join(", ")
                          : item.country}
                      </p>
                      <p className="flex-1 mr-5">
                        {typeof item.genre === "object"
                          ? item.genre.join(", ")
                          : item.genre}
                        {/* {console.log(typeof item.genre)} */}
                      </p>
                      <p className=" text-start w-20">{item.imdb}</p>
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
