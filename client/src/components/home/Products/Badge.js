import React from "react";

const Badge = ({ text }) => {
  return (
    <div className="bg-primeColor w-[62px] h-[20px] p-3 text-white flex justify-center items-center text-base font-semibold hover:bg-black duration-300 cursor-pointer">
      {text}
    </div>
  );
};

export default Badge;
