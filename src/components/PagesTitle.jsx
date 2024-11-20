import React from "react";
import CustomButton from "./Buttons/CustomButton";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const PagesTitle = ({ title, className }) => {
  const nav = useNavigate();
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <div
      className={classNames(
        "py-2 pl-8 pr-20 flex justify-between items-center flex-wrap",
        className
      )}
    >
      <h1 className="text-3xl">{title}</h1>
      {/* <CustomButton
        text={"Back"}
        className={"text-white bg-[#3c8dbc]"}
        click={() => nav(-1)}
      /> */}
    </div>
  );
};
PagesTitle.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
};

export default PagesTitle;
