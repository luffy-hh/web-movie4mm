import React, { useState } from "react";
import { Slider, Tabs, Radio } from "antd";
import {
  countriesArray,
  genres,
  sortOptions,
} from "../../constants/FilterData";
import { FaPlus } from "react-icons/fa6";
const Filters = () => {
  const [selectGenre, setSelectedGenre] = useState(null);
  const [selectedSort, setSelectedSort] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [sliderValue, setSliderValue] = useState([0, 10]);
  const handleGenreChange = (e) => setSelectedGenre(e.target.value);
  const handleLanguageClick = (e) =>
    e.target.value === selectedLanguage && setSelectedLanguage(null);

  const handleGenreClick = (e) =>
    e.target.value === selectGenre && setSelectedGenre(null);

  const handleCountryClick = (e) =>
    e.target.value === selectedCountry && setSelectedCountry(null);

  const handleSortClick = (e) =>
    e.target.value === selectedSort && setSelectedSort(null);
  // console.log(selectedLanguage);
  const items = [
    {
      label: "Filters",
      key: "2",
      children: (
        <div className="flex flex-col">
          <div>
            <p className="text-xl text-center shadow">IMDB Rating</p>
            <p className="text-center mt-2">
              Rating: {sliderValue[0]} - {sliderValue[1]}
            </p>
            <Slider
              onChange={(value) => setSliderValue(value)}
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
            <p className="text-lg text-center shadow mb-2">Sort By</p>
            <Radio.Group
              onChange={(e) => setSelectedSort(e.target.value)}
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
            <p className="text-lg text-center shadow mb-2">Genres</p>
            <Radio.Group
              onChange={handleGenreChange}
              value={selectGenre}
              block
              optionType="button"
              className=" max-h-[20rem] overflow-y-scroll"

              // options={genres()}
            >
              {genres().map((genre) => (
                <Radio.Button
                  key={genre.value}
                  value={genre.value}
                  onClick={handleGenreClick}
                  className="ml-2 mb-1 rounded overflow-hidden border-l-2"
                >
                  <div className="flex gap-1 items-center">
                    <span
                      className={`inline-block ${
                        selectGenre === genre.value ? "rotate-[45deg]" : ""
                      }  transition-all duration-500`}
                    >
                      {genre.icon}
                    </span>
                    {genre.label}
                  </div>
                </Radio.Button>
              ))}
            </Radio.Group>
          </div>
          <div className="mt-4">
            <p className="text-lg text-center shadow mb-2">Language</p>
            <Radio.Group
              onChange={(e) => setSelectedLanguage(e.target.value)}
              value={selectedLanguage}
              block
              optionType="button"
            >
              <Radio.Button
                value={"english"}
                onClick={handleLanguageClick}
                className="ml-2 mb-1 rounded overflow-hidden border-l-2"
              >
                <div className="flex gap-1 items-center">
                  <span
                    className={`inline-block ${
                      selectedLanguage === "english" ? "rotate-[45deg]" : ""
                    }  transition-all duration-500`}
                  >
                    <FaPlus />
                  </span>
                  English
                </div>
              </Radio.Button>
              <Radio.Button
                value={"other"}
                onClick={handleLanguageClick}
                className="ml-2 mb-1 rounded overflow-hidden border-l-2"
              >
                <div className="flex gap-1 items-center">
                  <span
                    className={`inline-block ${
                      selectedLanguage === "other" ? "rotate-[45deg]" : ""
                    }  transition-all duration-500`}
                  >
                    <FaPlus />
                  </span>
                  Other
                </div>
              </Radio.Button>
            </Radio.Group>
          </div>
          <div className="mt-4">
            <p className="text-lg text-center shadow mb-2">Countries</p>
            <Radio.Group
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className=" max-h-[20rem] overflow-y-scroll"
              block
              optionType="button"
            >
              {countriesArray.map((country, i) => (
                <Radio.Button
                  key={i}
                  value={country.value}
                  onClick={handleCountryClick}
                  className="ml-2 mb-1 rounded overflow-hidden border-l-2"
                >
                  <div className="flex gap-1 items-center">
                    <span
                      className={`inline-block ${
                        selectedCountry === country.value
                          ? "rotate-[45deg]"
                          : ""
                      }  transition-all duration-500`}
                    >
                      {country.icon}
                    </span>
                    {country.label}
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
      className="w-[20%]"
      type="card"
      defaultActiveKey="1"
      centered
      items={items}
    />
  );
};

export default Filters;
