import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className=" w-full h-[5rem] bg-slate-800 text-slate-200 flex items-center">
      <div className="w-[70%] mx-auto flex items-center justify-between">
        <p>Copyright {currentYear}</p>
        <div className="flex gap-4">
          <p>Live TV</p>
          <p>Series</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
