import React from "react";
import CustomButton from "./Buttons/CustomButton";
import { useNavigate } from "react-router-dom";

const PagesTitle = ({ title }) => {
  const nav = useNavigate();
  return (
    <div className="py-2 pl-8 pr-20 flex justify-between items-center flex-wrap">
      <h1 className="text-3xl">{title}</h1>
      {/* <CustomButton
        text={"Back"}
        className={"text-white bg-[#3c8dbc]"}
        click={() => nav(-1)}
      /> */}
    </div>
  );
};

export default PagesTitle;
