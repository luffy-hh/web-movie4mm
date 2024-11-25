import React, { useState } from "react";
import { List, Tag } from "antd";
import { FaAngleDoubleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { addExtraClassNames } from "../../utilities/UtilFunctions";
import withRouter from "../HOCs/withRouter";
import { useSelector } from "react-redux";
import { selectIsDarkMode } from "../../app/ThemeConfig/themeConfigSlice.jsx";
import { BsStar } from "react-icons/bs";

const GridBox = ({
  pagination = false,
  router,
  title,
  titleTag,
  items = [],
  type,
  loading = false,
  className,
  cardClassName,
  onChange,
  seeMore = true,
  seeMorePath,
  grid = {
    gutter: 16,
    xs: 2,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 6,
    xxl: 6,
  },
}) => {
  const [isMaximized, setIsMaximized] = useState(true);
  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
  };
  const isDarkMode = useSelector(selectIsDarkMode);
  // console.log(pagination);

  return (
    <div className={addExtraClassNames(className, "mb-10")}>
      {title && (
        <div
          className={`flex justify-between p-2 ${isDarkMode && "text-white"}`}
        >
          <p className="text-2xl mb-2 flex items-center">
            <span className=" inline-block border-b-2 pb-2 border-[#0769b4] mr-6">
              {title}
            </span>
            {titleTag && (
              <Tag color="#2db7f5" className="text-2xl py-2 font-semibold">
                {titleTag}
              </Tag>
            )}
          </p>
          {/* <div>
          <button style={{ marginRight: "5px" }} onClick={handleMaximize}>
            {isMaximized ? <FaMinimize /> : <FaMaximize />}
          </button>
        </div> */}
          {seeMore && (
            <Link
              to={seeMorePath}
              className="flex items-center gap-2 font-semibold hover:cursor-pointer hover:underline hover:underline-offset-4"
            >
              See all
              <FaAngleDoubleRight />
            </Link>
          )}
        </div>
      )}
      <div
        style={{
          transition: "height 0.5s ease-in-out",
          overflow: "hidden",
          height: isMaximized ? "auto" : "0",
        }}
      >
        <List
          grid={{ ...grid }}
          dataSource={items}
          className={`p-2 flex flex-col gap-4`}
          pagination={pagination}
          onChange={onChange}
          loading={loading}
          renderItem={(item) => (
            <List.Item>
              <div
                className={addExtraClassNames(
                  "relative aspect-[2/3] w-full group overflow-hidden rounded-md",
                  cardClassName,
                )}
              >
                <img
                  src={item.thumbnail_url}
                  alt={item.title}
                  className="absolute top-0 left-0 w-full h-full z-10"
                />
                <div className="absolute top-2 w-full left-0 z-20 flex justify-between items-center px-1 flex-wrap gap-y-2">
                  <div className="flex gap-2">
                    <Tag className="text-sm !m-0" color="#7e22ce">
                      {item.video_quality}
                    </Tag>
                    <Tag className="text-sm !m-0" color="#c026d3">
                      {item.release}
                    </Tag>
                  </div>
                  <Tag
                    className="text-sm !m-0 flex items-center gap-1"
                    color="#fbbf24"
                  >
                    <BsStar /> {item.imdb_rating}
                  </Tag>
                </div>

                <p className="absolute text-center bottom-0 left-0 w-[100%] bg-gradient-to-t from-gray-500 to-transparent z-20 text-white break-words overflow-ellipsis">
                  {item.title}
                </p>
                {/* Hover Overlay with Spread Animation on X-axis */}
                <div className="absolute inset-0 bg-black/40 z-30 opacity-0 scale-x-0 origin-center group-hover:scale-x-100 group-hover:opacity-100 transition-all duration-500 ease-out"></div>

                {/* Play Button with Border Animation */}
                <div className="absolute inset-0 flex justify-center items-center z-40 opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-out ">
                  {/* Play Button Wrapper */}
                  <div
                    onClick={() =>
                      router.nav(
                        `/watch/${
                          item.is_tvseries === "1" ? "tvseries" : "movie"
                        }/${item.videos_id}`,
                        {
                          state: { ...item },
                        },
                      )
                    }
                    className="relative w-20 h-20 flex justify-center items-center  rounded-full custom-group"
                  >
                    {/* Border that will change on button hover */}
                    <div className="absolute inset-0 rounded-full border-4 border-[#f92d2d] transition-all duration-300 spin-border"></div>

                    {/* The button itself (without any hover effects) */}
                    <button className="absolute w-12 h-12 bg-white rounded-full flex justify-center items-center text-black inner-btn">
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

GridBox.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
  titleTag: PropTypes.string,
  cardClassName: PropTypes.string,
  className: PropTypes.string,
  grid: PropTypes.object,
  data: PropTypes.array,
  router: PropTypes.object,
  seeMore: PropTypes.bool,
  seeMorePath: PropTypes.string,
  type: PropTypes.string,
  pagination: PropTypes.object || PropTypes.bool,
  onChange: PropTypes.func,
  loading: PropTypes.bool,
};
const GridBoxWithRouter = withRouter(GridBox);
export default GridBoxWithRouter;
