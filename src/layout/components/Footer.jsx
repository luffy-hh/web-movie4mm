import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="w-full h-[5rem] bg-slate-800 text-slate-200 flex items-center mt-auto">
      <div className="w-[70%] mx-auto flex items-center justify-between">
        <p>Copyright {currentYear}</p>
        <div className="flex gap-4">
          <a href={"https://movie4mm.com/#Phdownload"} target={"_blank"}>
            Download Android App
          </a>
          <a href={"https://movie4mm.com/#TVdownload"} target={"_blank"}>
            Download Tv App
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
