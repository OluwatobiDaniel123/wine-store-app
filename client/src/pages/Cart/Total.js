import React from "react";
import { useSelector } from "react-redux";

const Total = () => {
  const { totalAmt, shippingCharge } = useSelector(
    (state) => state.orebiReducer.checkoutData
  );

  return (
    <div>
      <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
        Total
        <span className="font-bold tracking-wide text-lg font-titleFont">
          ${totalAmt + shippingCharge}
        </span>
      </p>
    </div>
  );
};

export default Total;
