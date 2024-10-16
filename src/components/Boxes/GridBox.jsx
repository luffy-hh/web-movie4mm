import React, { useState } from "react";
import { Card, List, Tag } from "antd";
import { FaMaximize, FaMinimize } from "react-icons/fa6";
import { FaAngleDoubleRight, FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { addExtraClassNames } from "../../utilities/UtilFunctions";
const data = [
  {
    title: "Title 1 Testing",
  },
  {
    title: "Title 2 long form",
  },
  {
    title: "Title 3 super very long form",
  },
  {
    title: "Title 4",
  },
  {
    title: "Title 5",
  },
  {
    title: "Title 6",
  },
  {
    title: "Title 1 Testing",
  },
  {
    title: "Title 2 long form",
  },
  {
    title: "Title 3 super very long form",
  },
  {
    title: "Title 4",
  },
  {
    title: "Title 5",
  },
  {
    title: "Title 6",
  },
  {
    title: "Title 1 Testing",
  },
  {
    title: "Title 2 long form",
  },
  {
    title: "Title 3 super very long form",
  },
  {
    title: "Title 4",
  },
  {
    title: "Title 5",
  },
  {
    title: "Title 6",
  },
  {
    title: "Title 1 Testing",
  },
  {
    title: "Title 2 long form",
  },
];
const GridBox = ({
  title,
  titleTag,
  className,
  cardClassName,
  grid = {
    gutter: 16,
    xs: 2,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
    xxl: 5,
  },
}) => {
  const [isMaximized, setIsMaximized] = useState(true);
  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  return (
    <div className={addExtraClassNames(className, "mb-10")}>
      {title && (
        <div className="flex justify-between p-2">
          <p className="text-2xl mb-2 flex items-center">
            <span className=" inline-block border-b-2 pb-2 border-[#0769b4] mr-6">
              {title}
            </span>
            <Tag color="#2db7f5" className="text-2xl py-2 font-semibold">
              {titleTag}
            </Tag>
          </p>
          {/* <div>
          <button style={{ marginRight: "5px" }} onClick={handleMaximize}>
            {isMaximized ? <FaMinimize /> : <FaMaximize />}
          </button>
        </div> */}
          <Link
            to={"/"}
            className="flex items-center gap-2 font-semibold hover:cursor-pointer hover:underline hover:underline-offset-4"
          >
            See all
            <FaAngleDoubleRight />
          </Link>
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
          dataSource={data}
          className={`p-5`}
          renderItem={(item) => (
            <List.Item>
              <div
                className={addExtraClassNames(
                  "relative aspect-[16/21] w-full group overflow-hidden",
                  cardClassName
                )}
              >
                <img
                  src="/imgs/1.jpg"
                  alt={item.title}
                  className="absolute top-0 left-0 w-full h-full z-10"
                />
                <div className="absolute top-2 w-full left-0 z-20 flex justify-between items-center px-1 flex-wrap gap-2">
                  <div className="flex gap-2">
                    <Tag className="text-sm !m-0" color="#7e22ce">
                      4k
                    </Tag>
                    <Tag className="text-sm !m-0" color="#c026d3">
                      2024
                    </Tag>
                  </div>
                  <Tag
                    className="text-sm !m-0 flex items-center gap-1"
                    color="#fbbf24"
                  >
                    <FaInfoCircle /> IMDB 5.6
                  </Tag>
                </div>

                <p className="absolute text-center bottom-0 left-0 translate-x-[35%] w-[60%] z-20 text-white break-words overflow-ellipsis">
                  {item.title}
                </p>

                {/* Hover Overlay with Spread Animation on X-axis */}
                <div className="absolute inset-0 bg-black/40 z-30 opacity-0 scale-x-0 origin-center group-hover:scale-x-100 group-hover:opacity-100 transition-all duration-500 ease-out"></div>

                {/* Play Button with Border Animation */}
                <div className="absolute inset-0 flex justify-center items-center z-40 opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-out ">
                  {/* Play Button Wrapper */}
                  <div className="relative w-20 h-20 flex justify-center items-center  rounded-full custom-group">
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
  titleTag: PropTypes.string,
  cardClassName: PropTypes.string,
  className: PropTypes.string,
  grid: PropTypes.object,
  data: PropTypes.array,
};

export default GridBox;
