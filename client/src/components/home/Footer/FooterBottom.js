import React from "react";
import { AiOutlineCopyright } from "react-icons/ai";

const FooterBottom = () => {
  return (
    <div className="w-full bg-[#05052e] group">
      <div className="max-w-container mx-auto border-t-[1px] pt-10 pb-20">
        <h6 className="text-titleFont font-normal text-center flex md:items-center justify-center text-lightText duration-200 text-xs">
          <span className="text-white mr-[1px] mt-[2px] md:mt-0 text-center md:inline-flex">
            <AiOutlineCopyright />
          </span>
          <p className="text-white">
            ChrisAlpha wine & liquor store Limited | 2024 | All Rights Reserved
            |
          </p>
          <a href="https://danovalab.com/" target="_blank" rel="noreferrer">
            <span className="ml-1 font-medium text-white group-hover:text-sky-700">
              Powered by danovalab
            </span>
          </a>
        </h6>
      </div>
    </div>
  );
};

export default FooterBottom;
