import React from "react";
import { Link } from "react-router-dom";

const ShopNow = () => {
  return (
    <Link to="/shop">
      <button className="bg-[#0f0f59] rounded-lg text-white text-lg font-bodyFont w-[185px] h-[50px] hover:bg-[#05052e] duration-300 font-bold">
        Shop Now
      </button>
    </Link>
  );
};

export default ShopNow;
