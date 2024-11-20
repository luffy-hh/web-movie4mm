import React, { useEffect, useState } from "react";
import GridBox from "../../components/Boxes/GridBox.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllPopularStars,
  selectAllPopularStars,
  selectAllPopularStarsStatus,
} from "../../app/HomeSlice/HomeSlice.jsx";
import { Input, List, Tag } from "antd";
import { Link } from "react-router-dom";
import { FaAngleDoubleRight } from "react-icons/fa";
import Loader from "../../components/Loader/Loader.jsx";

const PopularStars = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [filteredPopularStars, setFilteredPopularStars] = useState([]);
  useEffect(() => {
    dispatch(fetchAllPopularStars({ api: "/popular_stars" }));
  }, []);
  const popularStars = useSelector(selectAllPopularStars);
  const allPopularStarsStatus = useSelector(selectAllPopularStarsStatus);
  console.log(popularStars);
  useEffect(() => {
    if (search) {
      const filteredData = popularStars.filter((star) =>
        star.star_name.toLowerCase().includes(search.toLowerCase()),
      );
      setFilteredPopularStars(filteredData);
    } else {
      setFilteredPopularStars(popularStars);
    }
  }, [popularStars, search]);

  return (
    <>
      <div className="flex justify-between p-2 mb-4">
        <p className="text-2xl mb-2 flex items-center">
          <span className=" inline-block border-b-2 pb-2 border-[#0769b4] mr-6">
            Popular Stars
          </span>
        </p>
        <Input
          placeholder="Search"
          className="w-[15rem]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {allPopularStarsStatus === "loading" ? (
        <Loader spin={true} />
      ) : (
        <List
          grid={{
            gutter: 16,
            xs: 2,
            sm: 2,
            md: 3,
            lg: 4,
            xl: 6,
            xxl: 6,
          }}
          dataSource={filteredPopularStars}
          // className=""
          renderItem={(item) => (
            <List.Item>
              <Link to={`/content-by-star`} search={{ id: item.star_id }}>
                <div className="flex flex-col items-center">
                  <img
                    src={item.image_url}
                    alt={item.stat_name}
                    className="w-full h-[10rem] rounded-lg object-cover"
                  />
                  <p className="font-semibold ">{item.star_name}</p>
                </div>
              </Link>
            </List.Item>
          )}
        />
      )}
    </>
  );
};
export default PopularStars;
