import React, { useState } from "react";
import { Slider, Tabs, Radio } from "antd";
import { sortOptions } from "../../constants/FilterData";
import { FaPlus } from "react-icons/fa6";
import {
  getAllGenres,
  selectAllCountry,
} from "../../app/HomeSlice/HomeSlice.jsx";
import { useSelector } from "react-redux";
import {
  selectIsDarkMode,
  selectIsMediumScreen,
} from "../../app/ThemeConfig/themeConfigSlice.jsx";
import PropTypes from "prop-types";

const Filters = ({ setSearchParams }) => {
  const genreList = useSelector(getAllGenres);
  const countryList = useSelector(selectAllCountry);
  const isDarkMode = useSelector(selectIsDarkMode);
  const isMediumScreen = useSelector(selectIsMediumScreen);

  const [selectGenre, setSelectedGenre] = useState(null);
  const [selectedSort, setSelectedSort] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [sliderValue, setSliderValue] = useState([0, 10]);

  const handleGenreClick = (e) => {
    if (e.target.value === selectGenre) {
      setSelectedGenre(null);
      setSearchParams((prev) => ({ ...prev, category: "" }));
    }
  };
  const handleCountryClick = (e) => {
    if (e.target.value === selectedCountry) {
      setSelectedCountry(null);
      setSearchParams((prev) => ({ ...prev, country: "" }));
    }
  };

  const handleSortClick = (e) => {
    if (e.target.value === selectedSort) {
      setSelectedSort(null);
      setSearchParams((prev) => ({ ...prev, sort: "" }));
    }
  };
  const items = [
    {
      label: "Filters",
      key: "2",
      children: (
        <div className={`flex flex-col ${isDarkMode && "text-white"}`}>
          <div className={`${isDarkMode && "text-white"}`}>
            <p className="text-xl text-center shadow">IMDB Rating</p>
            <p className="text-center mt-2">
              Rating: {sliderValue[0]} - {sliderValue[1]}
            </p>
            <Slider
              onChange={(value) => {
                setSliderValue(value);
                setSearchParams((prev) => ({
                  ...prev,
                  minimum_rating: value[0],
                  maximum_rating: value[1],
                }));
              }}
              range
              min={0}
              step={0.1}
              max={10}
              defaultValue={sliderValue}
              value={sliderValue}
              styles={{
                marginTop: "0 !important",
                marginBottom: "0 !important",
              }}
            />
          </div>
          <div>
            <p className="text-xl text-center shadow mb-2">Sort By</p>
            <Radio.Group
              onChange={(e) => {
                setSelectedSort(e.target.value);
                setSearchParams((prev) => ({ ...prev, sort: e.target.value }));
              }}
              value={selectedSort}
              block
              optionType="button"
              // options={sortOptions}
            >
              {sortOptions.map((option) => (
                <Radio.Button
                  key={option.value}
                  value={option.value}
                  onClick={handleSortClick}
                  className="ml-2 mb-1 rounded overflow-hidden border-l-2"
                >
                  <div className="flex gap-1 items-center">
                    <span
                      className={`inline-block ${
                        selectedSort === option.value ? "rotate-[45deg]" : ""
                      }  transition-all duration-500`}
                    >
                      {option.icon}
                    </span>
                    {option.label}
                  </div>
                </Radio.Button>
              ))}
            </Radio.Group>
          </div>
          <div className="mt-4">
            <p className="text-xl text-center shadow mb-2">Genres</p>
            <Radio.Group
              onChange={(e) => {
                setSelectedGenre(e.target.value);
                setSearchParams((prev) => ({
                  ...prev,
                  category: e.target.value,
                }));
              }}
              value={selectGenre}
              block
              optionType="button"
              className=" max-h-[20rem] overflow-y-scroll"

              // options={genres()}
            >
              {genreList.map((genre) => (
                <Radio.Button
                  key={genre.genre_id}
                  value={genre.genre_id}
                  onClick={handleGenreClick}
                  className="ml-2 mb-1 rounded overflow-hidden border-l-2"
                >
                  <div className="flex gap-1 items-center">
                    <span
                      className={`inline-block ${
                        selectGenre === genre.genre_id ? "rotate-[45deg]" : ""
                      }  transition-all duration-500`}
                    >
                      <FaPlus />
                    </span>
                    {genre.name}
                  </div>
                </Radio.Button>
              ))}
            </Radio.Group>
          </div>
          <div className="mt-4">
            <p className="text-xl text-center shadow mb-2">Countries</p>
            <Radio.Group
              value={selectedCountry}
              onChange={(e) => {
                setSelectedCountry(e.target.value);
                setSearchParams((prev) => ({
                  ...prev,
                  country: e.target.value,
                }));
              }}
              className=" max-h-[20rem] overflow-y-scroll"
              block
              optionType="button"
            >
              {countryList.map((country, i) => (
                <Radio.Button
                  key={i}
                  value={country.country_id}
                  onClick={handleCountryClick}
                  className="ml-2 mb-1 rounded overflow-hidden border-l-2"
                >
                  <div className="flex gap-1 items-center">
                    <span
                      className={`inline-block ${
                        selectedCountry === country.country_id
                          ? "rotate-[45deg]"
                          : ""
                      }  transition-all duration-500`}
                    >
                      <FaPlus />
                    </span>
                    {country.name}
                  </div>
                </Radio.Button>
              ))}
            </Radio.Group>
          </div>
        </div>
      ),
    },
  ];
  return (
    <Tabs
      className="lg:w-[20%] w-[80%] mx-auto "
      type="card"
      defaultActiveKey="1"
      centered
      items={items}
    />
  );
};

Filters.propTypes = {
  setSearchParams: PropTypes.func,
};
export default Filters;
